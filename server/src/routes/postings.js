import express from 'express'
import { supabaseAdmin } from '../../config/supabaseAdmin.js'

const router = express.Router();

// fetch all postings
router.get('/', async (req, res) => {
    try {
        const { type } = req.query

        let query = supabaseAdmin
            .from('postings')
            .select(`
                *,
                group:groups!group_id(name)
            `)
            .order('start_time', { ascending: true })

        if (type) {
            query = query.eq('type', type)
        }

        const { data, error } = await query

        if (error) {
            return res.status(500).json({ message: error.message })
        }

        return res.status(200).json(data)

    } catch (error) {
        console.error('Error: ', error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
});

// fetch all postings belonging to a specific group
router.get('/group/:groupId', async (req, res) => {
    try {
        const { groupId } = req.params

        const { data, error } = await supabaseAdmin
            .from('postings')
            .select('*')
            .eq('group_id', groupId)
            .order('start_time', { ascending: true })

        if (error) {
            return res.status(500).json({ message: error.message })
        }

        return res.status(200).json(data)
    
    } catch (error) {
        console.error('Error: ', error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
});

// fetch one posting
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const { data, error } = await supabaseAdmin
            .from('postings')
            .select(`
                *,
                group:groups!group_id(name)
            `)
            .eq('id', id)
            .single()
        
        if (error) {
            return res.status(404).json({ message: 'Posting not found' })
        }

        return res.status(200).json(data)

    } catch (error) {
        console.error('Error: ', error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
});

// create a new posting
router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            group_id,
            photo_url,
            start_time,
            end_time,
            location,
            created_by,
            type,
            collab_group_id
        } = req.body

        if (!title || !start_time || !end_time) {
            return res.status(400).json({
                message: 'Posting requires title, start time, and end time'
            })
        }

        const { data, error } = await supabaseAdmin
            .from('postings')
            .insert([
                {
                    title,
                    description,
                    group_id,
                    photo_url,
                    start_time,
                    end_time,
                    location,
                    created_by,
                    type,
                    collab_group_id
                }
            ])
            .select()
            .single()

        if (error) {
            return res.status(400).json({ message: error.message })
        }

        return res.status(201).json(data)

    } catch (error) {
        console.error('Error: ', error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
});

// update an existing posting
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const { data, error } = await supabaseAdmin
            .from('postings')
            .update(req.body)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            return res.status(400).json({ message: error.message })
        }

        return res.status(200).json(data)
    
    } catch (error) {
        console.error('Error: ', error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
});

// delete a posting
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { error } = await supabaseAdmin
            .from('postings')
            .delete()
            .eq('id', id)

        if (error) {
            return res.status(400).json({ message: error.message })
        }

        return res.status(200).json({
            message: 'Posting deleted successfully'
        })

    } catch (error) {
        console.error('Error: ', error.message)
        return res.status(500).json({ message: 'Internal server error' })
    }
});

export default router;
