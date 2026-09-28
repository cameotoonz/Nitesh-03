import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { category, featured, page = '1', per_page = '24', all } = req.query;
      let query = supabase.from('projects').select('*', { count: 'exact' });
      if (!all) query = query.eq('published', true);
      if (category === 'long' || category === 'short') query = query.eq('category', category);
      if (featured === 'true' || featured === 'false') query = query.eq('featured', featured === 'true');
      query = query.order('display_order', { ascending: true }).order('id', { ascending: true });
      const p = Math.max(1, parseInt(String(page), 10) || 1);
      const pp = Math.min(48, Math.max(1, parseInt(String(per_page), 10) || 24));
      query = query.range((p - 1) * pp, p * pp - 1);
      const { data, error, count } = await query;
      if (error) throw error;
      return res.status(200).json({ projects: data ?? [], total: count ?? 0, page: p, per_page: pp });
    }

    if (req.method === 'POST') {
      const { title, description, category, year, thumbnail, video_url, external_url, platform, featured, published, display_order } = req.body || {};
      if (!title || !category) return res.status(400).json({ error: 'title and category are required' });
      const { data, error } = await supabase
        .from('projects')
        .insert({ title, description: description ?? null, category, year: year ?? null, thumbnail: thumbnail ?? null, video_url: video_url ?? null, external_url: external_url ?? null, platform: platform ?? null, featured: !!featured, published: published !== false, display_order: display_order ?? 0 })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, title, description, category, year, thumbnail, video_url, external_url, platform, featured, published, display_order } = req.body || {};
      if (!id) return res.status(400).json({ error: 'id is required' });
      const patch = {};
      if (title !== undefined) patch.title = title;
      if (description !== undefined) patch.description = description;
      if (category !== undefined) patch.category = category;
      if (year !== undefined) patch.year = year;
      if (thumbnail !== undefined) patch.thumbnail = thumbnail;
      if (video_url !== undefined) patch.video_url = video_url;
      if (external_url !== undefined) patch.external_url = external_url;
      if (platform !== undefined) patch.platform = platform;
      if (featured !== undefined) patch.featured = featured;
      if (published !== undefined) patch.published = published;
      if (display_order !== undefined) patch.display_order = display_order;
      const { data, error } = await supabase.from('projects').update(patch).eq('id', id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const id = req.body?.id ?? req.query?.id;
      if (!id) return res.status(400).json({ error: 'id is required' });
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
