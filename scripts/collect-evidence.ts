// Copies the artifacts of each @BUG-xxx test (screenshots, video, trace, attachments)
// from test-results/ into bugs/evidence/BUG-xxx/ so bug reports can link to them.
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

type Attachment = { name: string; contentType: string; path?: string; body?: string };
type Spec = { title: string; tags: string[]; tests: { projectName: string; results: { status: string; attachments: Attachment[]; errors: { message: string }[] }[] }[] };
type Suite = { specs?: Spec[]; suites?: Suite[] };

const report = JSON.parse(readFileSync('test-results/results.json', 'utf8')) as { suites: Suite[] };
const specs = (s: Suite): Spec[] => [...(s.specs ?? []), ...(s.suites ?? []).flatMap(specs)];
const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, '');

for (const spec of report.suites.flatMap(specs)) {
  const bugId = spec.tags.find(t => /^BUG-\d+$/.test(t));
  if (!bugId) continue;
  const result = spec.tests[0].results.at(-1)!;
  const dir = join('bugs', 'evidence', bugId);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  for (const a of result.attachments) {
    const name = a.name === 'screenshot' ? 'final-state' : a.name;
    if (a.path) copyFileSync(a.path, join(dir, `${name}${extname(a.path)}`));
    else if (a.body) writeFileSync(join(dir, `${name}.${a.contentType.split('/')[1]}`), Buffer.from(a.body, 'base64'));
  }
  writeFileSync(join(dir, 'assertion-failures.txt'), result.errors.map(e => stripAnsi(e.message)).join('\n\n---\n\n'));
  console.log(`${bugId}: ${result.attachments.length} artifacts -> ${dir}`);
}

// Optional: EXPORT_DIR=~/Desktop/folder also gathers every screenshot in one flat folder,
// named BUG-xxx_<name>.png, ready to attach to tickets.
const exportDir = process.env.EXPORT_DIR;
if (exportDir) {
  mkdirSync(exportDir, { recursive: true });
  for (const bugId of readdirSync(join('bugs', 'evidence'))) {
    for (const file of readdirSync(join('bugs', 'evidence', bugId)).filter(f => f.endsWith('.png'))) {
      copyFileSync(join('bugs', 'evidence', bugId, file), join(exportDir, `${bugId}_${file}`));
    }
  }
  console.log(`Screenshots exported to ${exportDir}`);
}
