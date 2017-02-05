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

class eventTableViewCell: UITableViewCell {
    
    @IBOutlet weak var eventName: UILabel!
    @IBOutlet weak var eventDescription: UITextView!
    @IBOutlet weak var eventIcon: UIImageView!
    
    
}

class MainViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    let ref = FIRDatabase.database().reference()
    let eventsRef = FIRDatabase.database().reference(withPath: "master-events")

    var eventArray : [NSDictionary] = []
    
    @IBOutlet weak var tableView: UITableView!

    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.pullData()
        tableView.tableFooterView = UIView()
        tableView.register(UINib(nibName: "EventTableViewCell", bundle: nil), forCellReuseIdentifier: "event")

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
                    let eventDataSimp: [String: String] =  ["event_name":child.childSnapshot(forPath: "event_name").value as! String,
                                                             "event_description":child.childSnapshot(forPath: "event_description").value as! String,
                                                             "event_category":child.childSnapshot(forPath: "event_category").value as! String]
                    self.eventArray.append(eventDataSimp as NSDictionary)
                    self.tableView.reloadData()
                }
                print("DONE")
            })

    }
    
     func numberOfSectionsInTableView(tableView: UITableView) -> Int{
        return 1
    }
    
    
     func tableView(_ tableView:UITableView, numberOfRowsInSection section:Int) -> Int
    {
        return self.eventArray.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "event", for: indexPath) as! eventTableViewCell
        cell.selectionStyle = .none
        let currentEvent = eventArray[indexPath.row]
        cell.eventName.text = currentEvent.value(forKey: "event_name") as? String
        cell.eventDescription.text = currentEvent.value(forKey: "event_description") as? String

        //        let currentQuestion = questions[indexPath.row]
        //        cell.questionLabel.text = currentQuestion["text"] as? String
        //        cell.topicLabel.text = currentQuestion["topic"] as? String
        //        cell.usernameLabel.text = (currentQuestion["student"] as! PFUser).username!
        
                return cell
    }
    
//     func tableView(_ tableView: UITableView!, cellForRowAt indexPath:IndexPath) -> UITableViewCell!
//    {
//        let cell = tableView.dequeueReusableCell(withIdentifier: "request", for: indexPath) as! eventTableViewCell
//        cell.selectionStyle = .none
////        let currentQuestion = questions[indexPath.row]
////        cell.questionLabel.text = currentQuestion["text"] as? String
////        cell.topicLabel.text = currentQuestion["topic"] as? String
////        cell.usernameLabel.text = (currentQuestion["student"] as! PFUser).username!
//        
//        return cell
//
//    }
    
    
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
