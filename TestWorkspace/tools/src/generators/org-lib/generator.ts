import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { OrgLibGeneratorSchema } from './schema';
import { writeFile } from 'fs/promises';

export async function orgLibGenerator(
  tree: Tree,
  options: OrgLibGeneratorSchema
) {
  const projectRoot = `libs/${options.name}`;
  
  // const projects = getProjects(tree);
  // projects.forEach(element => {
  //   console.log(element)
  // });

  // Fetch remote configuration to json object
  
  
  async function getLibConfig() {
    
    const libConfigUrl:string = 'http://localhost:80/lib-config';
    const filesPath = path.join(__dirname,"files");
    const htmlPath = `${filesPath}/src/lib/__name__/__name__.component.html.template`

    try {
      const response = await fetch(libConfigUrl);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      const content = await response.json();
      await writeFile(`${htmlPath}`,content['componentHtml']);
    } catch (error) {
      console.error(error)
    }
  }
 
  await getLibConfig()
 
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);

  await formatFiles(tree);
  
  const newRead = tree.read(`${projectRoot}/src/lib/${options.name}/${options.name}.component.html`).toString();
  console.log(`New read: ${newRead}`)
}

export default orgLibGenerator;
