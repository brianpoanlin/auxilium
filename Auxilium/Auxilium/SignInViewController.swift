//
//  SignInViewController.swift
//  Auxilium
//
//  Created by Brian Lin on 2/4/17.
//  Copyright © 2017 Brian Lin. All rights reserved.
//

import UIKit
import Firebase
import FirebaseAuth

class SignInViewController: UIViewController {

    @IBOutlet weak var username: UITextField!
    @IBOutlet weak var password: UITextField!
    
    @IBOutlet var tapper: UITapGestureRecognizer!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }

    @IBAction func tapped(_ sender: Any) {
        username.resignFirstResponder()
        password.resignFirstResponder()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        if FIRAuth.auth()?.currentUser != nil {
            print("user is signed in")
            self.performSegue(withIdentifier: "toMainView", sender: nil)
            
        } else {
            print("user is NOT signed in")
            // ...
        }

    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func pressedSignIn(_ sender: Any) {
        FIRAuth.auth()?.signIn(withEmail: self.username.text!, password: self.password.text!) { (user, error) in
            if user != nil {
                print("sign in successful")
                self.performSegue(withIdentifier: "toMainView", sender: nil)
            }
        }
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
