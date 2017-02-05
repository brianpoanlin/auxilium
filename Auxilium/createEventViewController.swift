//
//  createEventViewController.swift
//  Auxilium
//
//  Created by Brian Lin on 2/4/17.
//  Copyright © 2017 Brian Lin. All rights reserved.
//

import UIKit
import MapKit
import FirebaseStorage
import FirebaseAuth
import FirebaseDatabase

class createEventViewController: UIViewController {
    @IBOutlet weak var eventName: UITextField!
    @IBOutlet weak var eventDescription: UITextView!
    @IBOutlet weak var datePicker: UIDatePicker!

    @IBOutlet weak var locationName: UITextField!
    @IBOutlet weak var streetNumber: UITextField!
    @IBOutlet weak var locationState: UITextField!
    @IBOutlet weak var locationZip: UITextField!
    
    let ref = FIRDatabase.database().reference()
    let eventsRef = FIRDatabase.database().reference(withPath: "master-events")
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func sendData(lat: Double, withLong:Double)
    {
        let newEventRef = self.ref
            .child("master-events")
            .childByAutoId()
        
        let newEventId = newEventRef.key
        let newEventData:[String: AnyObject]  = [
            "event_id": newEventId as AnyObject,
            "event_name":"Beach Clean Up" as AnyObject,
            "event_description":"Cleaning up the beach at Half Moon Bay, CA. 20 Volunteers needed for this event. This event will be all day long" as AnyObject,
            "event_ownerID": "122233444xxxx"as AnyObject ,
            "event_time": ["event_date":"Date", "event_hour":"16", "event_minute":"40"] as AnyObject,
            "event_location":["event_Lat":lat, "event_long":withLong,"event_locName":"Half Moon Bay, CA", "Address": ["street_number":"1030","street_name":"Harlan Dr","street_city":"San Jose","street_state":"California", "street_zipcode":"95129"] as AnyObject] as AnyObject,
            "event_category":"Clean" as AnyObject
        ]
        
        
        newEventRef.setValue(newEventData)
        
    }
    
    @IBAction func createEvent(_ sender: Any) {
        let address:String = "\(self.streetNumber) \(self.locationState) \(self.locationZip)"
//        self.getLatLngForZip(zipCode: address)
        print("arrived HERE")
        print(address)
//        self.addressToCoordinatesConverter(address: address)
    }
    
    func addressToCoordinatesConverter(address: String) {
        print(address)
       
    }
    
//    func getLatLngForZip(zipCode: String) {
//        print(zipCode)
//        let url = NSURL(string: zipCode)
//        let data = NSData(contentsOf: url! as URL)
//        let json = try! JSONSerialization.jsonObject(with: data! as Data, options: JSONSerialization.ReadingOptions.allowFragments) as! NSDictionary
//        if let result = json["results"] as? NSArray {
//            if let geometry = result[0]["geometry"] as? NSDictionary {
//                if let location = geometry["location"] as? NSDictionary {
//                    let latitude = location["lat"] as! Float
//                    let longitude = location["lng"] as! Float
//                    print("\n\(latitude), \(longitude)")
//                }
//            }
//        }
//    }

}
