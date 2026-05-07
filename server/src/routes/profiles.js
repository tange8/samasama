import express from 'express';
import { supabaseAdmin } from '../../config/supabaseAdmin.js'


const router = express.Router();


// GET /api/profiles/:role/:id
router.get('/:role/:id', async (req, res) => {
 const { role, id } = req.params;


 const { data, error } = await supabaseAdmin
   .from(role)
   .select('*')
   .eq('id', id)
   .single();


 if (error) return res.status(500).json({ error: error });


 res.status(200).json(data);
});


// PUT /api/profiles/:role/:id
router.put('/:role/:id', async (req, res) => {
 const { role, id } = req.params;
 const updates = req.body;
 

 const { data, error } = await supabaseAdmin
   .from('users')
   .update(updates)
   .eq('id', id)
   .select()
   .single();


 if (error) return res.status(500).json({ error: error });


 res.status(200).json(data);
});


// GET /user/:id/follows
router.get('/user/:id/follows', async (req, res) => {
 const { id } = req.params;


 const { data, error } = await supabaseAdmin
   .from('follows')
   .select('groups(*)') // join groups table
   .eq('user_id', id);


 if (error) return res.status(500).json({ error: error });


 res.status(200).json(data);
});


// DELETE /user/:id/follows/:groupId
router.delete('/user/:id/follows/:groupId', async (req, res) => {
 const { id, groupId } = req.params;


 const { error } = await supabaseAdmin
   .from('follows')
   .delete()
   .match({ user_id: id, group_id: groupId });


 if (error) return res.status(500).json({ error: error });


 res.status(200).json({ message: 'Unfollowed' });
});


// GET /api/profiles/user/:id/saved
router.get('/user/:id/saved', async (req, res) => {
 const { id } = req.params;


 const { data, error } = await supabaseAdmin
   .from('saved_posts')
   .select(`
     *,
     postings (title, description, group_id, photo_url, start_time, end_time, location, type, groups!group_id(*))
   `)
   .eq('user_id', id);


 console.log(data);


 if (error) {
   return res.status(500).json({ error: error.message });
 }


 res.status(200).json(data);
});


// POST /api/profiles/user/:id/saved
router.post('/user/:id/saved', async (req, res) => {
 const { id } = req.params;
 const { posting_id } = req.body;


 const { data, error } = await supabaseAdmin
   .from('saved_posts')
   .insert([{ user_id: id, posting_id }]);


 if (error) {
   console.error("Error saving post: ", error)
   return res.status(500).json({ error: error });
 }
 res.status(200).json(data);
});


// DELETE /api/profiles/user/:id/saved/:postingId
router.delete('/user/:id/saved/:postingId', async (req, res) => {
 const { id, postingId } = req.params;


 const { error } = await supabaseAdmin
   .from('saved_posts')
   .delete()
   .match({ user_id: id, posting_id: postingId });


 if (error) {
   console.error("Error unsaving post: ", error)
   return res.status(500).json({ error: error.message })
 }


 res.status(200).json({ message: 'Unsaved successfully' });
});


export default router;
