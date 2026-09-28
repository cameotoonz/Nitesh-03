import type { ProjectsResponse } from './types';

export async function getProjects(opts: {
  category?: 'long' | 'short';
  page?: number;
  per_page?: number;
}): Promise<ProjectsResponse> {
  const params = new URLSearchParams();
  if (opts.category) params.set('category', opts.category);
  params.set('page', String(opts.page ?? 1));
  params.set('per_page', String(opts.per_page ?? 6));
  const res = await fetch(`/api/projects?${params.toString()}`);
  if (!res.ok) throw new Error(`Projects request failed (${res.status})`);
  return (await res.json()) as ProjectsResponse;
}
