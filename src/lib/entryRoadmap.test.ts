import { describe,it,expect } from 'vitest';
import { RESEARCH_COVERAGE } from '../data/researchCoverage';
import { ENTRY_DAYS,ENTRY_QUESTIONS,MANAGEMENT_TOPICS } from '../data/entryRoadmap';
import index from '../../data/belge_index.json';
describe('Final board source coverage',()=>{
 it('maps every original topic exactly once with a valid page',()=>{
  expect(RESEARCH_COVERAGE).toHaveLength(20);
  expect(new Set(RESEARCH_COVERAGE.map(d=>d.id)).size).toBe(20);
  for(const doc of index.documents){const row=RESEARCH_COVERAGE.find(r=>r.id===doc.id)!;expect(row.title).toBe(doc.title);expect(row.page).toBeGreaterThan(0);expect(row.page).toBeLessThanOrEqual(doc.pages);expect(row.target.startsWith('#')).toBe(true);}
 });
 it('keeps seven decision questions and proposed 30/60/90 milestones',()=>{
  expect(ENTRY_QUESTIONS).toHaveLength(7);expect(ENTRY_DAYS.map(d=>d.day)).toEqual([30,60,90]);
  for(const item of [...ENTRY_QUESTIONS,...ENTRY_DAYS,...MANAGEMENT_TOPICS]) {const doc=index.documents.find(d=>d.id===Number(item.file.slice(1)))!;expect(item.page).toBeLessThanOrEqual(doc.pages);expect(item.page).toBeGreaterThan(0);}
  expect(ENTRY_DAYS[2].gate).toContain('resmî izin veya tesis bitiş süresi değildir');
 });
});
