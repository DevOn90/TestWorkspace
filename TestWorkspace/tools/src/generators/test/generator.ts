import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  readJson,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { TestGeneratorSchema } from './schema';

export async function testGenerator(tree: Tree, options: TestGeneratorSchema) {
  
  
  
  const scopeName = readJson(tree, 'package.json').name;

  const resolvedOptions = {
    ...options,
    name: names(options.name).fileName,
    scope: scopeName,
  }
  
  const projectRoot = `packages/${resolvedOptions.name}`;
  
  generateFiles(
    tree, 
    path.join(__dirname, 'files'),
    projectRoot, 
    resolvedOptions
  );
  await formatFiles(tree);
}

export default testGenerator;
