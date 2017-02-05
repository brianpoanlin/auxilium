//
//  MainViewController.swift
//  
//
//  Created by Brian Lin on 2/4/17.
//
//

import UIKit
import Firebase
import FirebaseStorage
import FirebaseAuth
import FirebaseDatabase

class MainViewController: UIViewController {
    
    let ref = FIRDatabase.database().reference()
    let eventsRef = FIRDatabase.database().reference(withPath: "master-events")

    var eventArray : [AnyObject] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.pullData()
        // Do any additional setup after loading the view.
    }
    
    override func viewDidAppear(_ animated: Bool) {

       
    }
    
    func sendData()
    {
        let newEventRef = self.ref
            .child("master-events")
            .childByAutoId()
        
        let newEventId = newEventRef.key
        let newEventData:[String: AnyObject]  = [
            "event_id": newEventId as AnyObject,
            "event_name":"Food Pantry" as AnyObject,
            "event_description":"Deliver food" as AnyObject,
            "event_ownerID": "122233444xxxx"as AnyObject ,
            "event_time": ["event_date":"Date", "event_hour":"16", "event_minute":"40"] as AnyObject,
            "event_location":["event_Lat":"23.2222", "event_long":"35.33", "Address": ["street_number":"1030","street_name":"Harlan Dr","street_city":"San Jose","street_state":"California", "street_zipcode":"95129"] as AnyObject] as AnyObject,
            "event_category":"test" as AnyObject
        ]
        
        
        newEventRef.setValue(newEventData)

    }
    
    func pullData(){
        eventsRef.queryOrdered(byChild: "master-events")
            .observeSingleEvent(of: .value, with: { snapshot in
                
                
                for child in snapshot.children.allObjects as? [FIRDataSnapshot] ?? []{
                    print(child.childSnapshot(forPath: "event_name").value as? String)
//                    self.eventArray.append(child)
                }
//                
//
                
//                for indObj in self.eventArray as! [NSDictionary] {
//                    print(indObj.object(forKey: "event_id"))
//                }
//                
                print("DONE")
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
