//
//  EventViewController.swift
//  Auxilium
//
//  Created by Brian Lin on 2/4/17.
//  Copyright © 2017 Brian Lin. All rights reserved.
//

import UIKit
import Firebase
import FirebaseDatabase

class EventViewController: UIViewController {

    @IBOutlet weak var eventName: UILabel!
    @IBOutlet weak var iconImg: UIImageView!
    @IBOutlet weak var dspText: UITextView!
    
    var toPass:String!
    let eventsRef = FIRDatabase.database().reference(withPath: "master-events/")
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("passed \(toPass)")
        self.pullData()
        // Do any additional setup after loading the view.
    }
    
    override var prefersStatusBarHidden: Bool {
        return true
    }
    
    func pullData(){
        
        eventsRef.child(toPass).observe(FIRDataEventType.value, with: { (snapshot) in
            let event = snapshot.value as? [String : AnyObject] ?? [:]
            let eventDict = event as NSDictionary
            self.eventName.text = eventDict.value(forKey: "event_name") as! String?
            let imgStr = eventDict.value(forKey: "event_category") as! String
            self.iconImg.image = UIImage(named: "\(imgStr).png")
            self.dspText.text = eventDict.value(forKey: "event_description") as! String?
            print(eventDict.value(forKey: "event_name"))
        })
        
    }


    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
