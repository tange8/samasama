import express from "express"
import { supabaseAdmin } from "../../config/supabaseAdmin.js"

const router = express.Router();

// sign up
router.post("/register", async(req, res) => {
    try {
        const { email, password, first_name, last_name, role, businessName, phoneNumber, org } = req.body

        const { data, error } = await supabaseAdmin.auth.signUp({
            email,
            password
        })

        if (error) {
            return res.status(500).json({ message: error.message })
        }

        const user = data.user

        if ( !user?.id || !email || !first_name || !last_name || !role ) {
            return res.status(400).json({ message: "Need userId, first name, last name, and role" })
        }

        // inserting into the users table
        const { error: userError } = await supabaseAdmin
            .from("users")
            .insert([
                {
                    id: user.id,
                    email,
                    first_name,
                    last_name,
                    role
                }
            ])

        if (userError) {
            console.log("Error signing up")
            return res.status(500).json({ message: userError.message })
        }

            // adding org to groups table
            if (role === "org_member") {
                if (!org) {
                    return res.status(400).json({ message: "Org name is needed" })
                }

                const { data: orgData, error: orgError } = await supabaseAdmin
                    .from("groups")
                    .insert([
                        {
                            name: org,
                            entity_type: "organization",
                            created_by: user.id
                        }
                    ])
                    .select()
                    .single()

                if (orgError) {
                    console.log("Error adding org to group table")
                    return res.status(500).json({ message: orgError.message })
                }   

                // adding org to membership table
                if (orgData) {
                    const { error: memberError } = await supabaseAdmin
                        .from("memberships")
                        .insert([
                            {
                                user_id: user.id,
                                group_id: orgData.id
                            }
                        ])
                    
                    if (memberError) {
                        console.log("Error adding org to membership table")
                        return res.status(500).json({ message: memberError.message })
                    }
                }

                return res.status(200).json({ message: "Organization uploaded successfully" })
            } else if (role === "business") {
                // adding business to groups table
                if (!businessName || !phoneNumber) {
                    return res.status(400).json({ message: "Need business name and phone number" })
                }

                const { error: busError } = await supabaseAdmin
                    .from("groups")
                    .insert([
                        {
                            name: businessName,
                            entity_type: "business",
                            phone_number: phoneNumber,
                        }
                    ])
                
                if (busError) {
                    console.log("Error adding business to groups table")
                    return res.status(500).json({ message: busError.message })
                }

                return res.status(200).json({ message: "Business uploaded successfully." })
            }
        

        return res.status(200).json({ message: "User uploaded successfully." })

    } catch (error) {
        console.error("Error: ", error)
        return res.status(500).json({ error: "Internal server error" })
    }
})

// log in
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        console.log("Email: ", email)
        console.log("Password: ", password)
        
        if (!email || !password) {
            return res.status(400).json({ message: "Need email and password" })
        }

        const { data, error } = await supabaseAdmin.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            console.error("Error: ", error.message)
            return res.status(401).json({ message: error.message })
        }

        return res.status(200).json({
            message: "Logged in",
            user: data.user,
            session: data.session
        })

    } catch (error) {
        console.error("Error: ", error.message)
        res.status(500).json({ error: "Internal server error"})
    }
})

// logout
router.post("/logout", async (req, res) => {
    try {
        const { error } = await supabaseAdmin.auth.signOut();

        if ( error ) {
            console.error("Error: ", error.message)
            return res.status(500).json({ message: "Error Logging out" })
        }

        res.status(200).json({ message: "Log out successful" })

    } catch (error) {
        console.error("Error: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
})

export default router;