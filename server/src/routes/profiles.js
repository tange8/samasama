import express from 'express';
import config from '../../config/supabaseAdmin.cjs';

import {createClient} from '@supabase/supabase-js';
const supabaseUrl = "https://pzazipbuaqshnkqgixzt.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6YXppcGJ1YXFzaG5rcWdpeHp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTUzNzAzNiwiZXhwIjoyMDg3MTEzMDM2fQ.Tr1h1cXeGcAs969jz_GF4MrRayuG5GQAWpjJ6hTwmrc";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const router = express.Router();

// GET /api/profiles/:role/:id
router.get('/:role/:id', async (req, res) => {
  const { role, id } = req.params;

  const { data, error } = await supabase
    .from(role)
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

// PUT /api/profiles/:role/:id
router.put('/:role/:id', async (req, res) => {
  const { role, id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from(role)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

// GET /student/:id/follows
router.get('/student/:id/follows', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('follows')
    .select('groups(*)') // join groups table
    .eq('student_id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

// DELETE /student/:id/follows/:groupId
router.delete('/student/:id/follows/:groupId', async (req, res) => {
  const { id, groupId } = req.params;

  const { error } = await supabase
    .from('follows')
    .delete()
    .match({ student_id: id, group_id: groupId });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: 'Unfollowed' });
});

// POST /api/profiles/student/:id/saved
router.post('/student/:id/saved', async (req, res) => {
  const { id } = req.params;
  const { posting_id } = req.body;

  const { data, error } = await supabase
    .from('saved_posts')
    .insert([{ student_id: id, posting_id }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

// DELETE /api/profiles/student/:id/saved
router.delete('/student/:id/saved', async (req, res) => {
  const { id } = req.params;
  const { posting_id } = req.body;

  const { data, error } = await supabase
    .from('saved_posts')
    .delete([{ student_id: id, posting_id }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

export default router;
