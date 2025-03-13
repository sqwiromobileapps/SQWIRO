const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const packageJson = require('./package.json');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function linkApp({ srcDir, appDir, appName }) {
  try {
    console.log(chalk.green.bold(`yarn link ${appName}`));
    const ls = exec(`yarn link ${appName}`);

    ls.stdout.on('data', function stdout(data) {
      console.log('stdout: ' + data.toString());
    });

    ls.stderr.on('data', function stderr(data) {
      console.log('stderr: ' + data.toString(), data);
      chalk.red(`Cannot yarn link: ${appName}`);

      throw new Error(`
        💥  Error: ${data.toString()}

        💥  There was an error linking the app: ${appName}. Please fix to proceed.
      `);
    });

    ls.on('exit', function exit(code) {
      if (code === 0) {
        console.log(
          chalk.green.bold('✅ Link Created'),
          chalk.green(`${appName}`)
        );
      } else {
        chalk.red.bold('❌ Yarn Link Failed'), chalk.red(`${appName}`);
      }
    });
  } catch (error) {
    console.log(chalk.red.bold('❌ Yarn Link Failed'), chalk.red(`${appName}`));
    throw error;
  }

  if (fs.existsSync(`${appDir}`)) {
    console.log(
      chalk.green.bold('✅ Link Already Exists'),
      chalk.green(`${appDir}`)
    );
    try {
      const file = `${appDir}`.split('/').pop();
      exec(`rm "${appDir}/${file}" || true`);
    } catch (error) {
      // do nothing
    }

    return;
  } else {
    await sleep();
    const ls = exec(`ln -s "${srcDir}" "${appDir}"`);

    ls.stdout.on('data', function stdout(data) {
      console.log('stdout: ' + data.toString());
    });

    ls.stderr.on('data', function stderr(data) {
      console.log('stderr: ' + data.toString(), data);
      chalk.red(`Cannot create link: ${srcDir} -> ${appDir}`);
    });

    ls.on('exit', function exit(code) {
      if (code === 0) {
        console.log(
          chalk.green.bold('✅ Link Created'),
          chalk.green(`${appDir}`)
        );
      } else {
        chalk.red.bold('❌ App Linking Failed'), chalk.red(`${appDir}`);
      }
    });
  }

  // ls = spawn("ls", ["-lh", "/usr"]);
}

async function postinstall() {
  const businessApps = Object.keys(packageJson.dependencies)
    .filter((dependency) => dependency.startsWith('@sqwiromobilebusinessapps/'))
    .map((dependency) => dependency.replace('@sqwiromobilebusinessapps/', ''));

  const superAdminApps = Object.keys(packageJson.dependencies)
    .filter((dependency) =>
      dependency.startsWith('@sqwiromobilesuperadminapps/')
    )
    .map((dependency) =>
      dependency.replace('@sqwiromobilesuperadminapps/', '')
    );

  const customApps = Object.keys(packageJson.dependencies)
    .filter((dependency) => dependency.startsWith('@sqwiromobilecustomapps'))
    .map((dependency) => dependency.replace('@sqwiromobilecustomapps/', ''));

  const apiApps = Object.keys(packageJson.dependencies)
    .filter((dependency) => dependency.startsWith('@sqwiromobileapiapps/'))
    .map((dependency) => dependency.replace('@sqwiromobileapiapps/', ''));

  const userApps = Object.keys(packageJson.dependencies)
    .filter((dependency) => dependency.startsWith('@sqwiromobileuserapps/'))
    .map((dependency) => dependency.replace('@sqwiromobileuserapps/', ''));

  const coreapps = Object.keys(packageJson.dependencies)
    .filter((dependency) => dependency.startsWith('@sqwiromobile/'))
    .map((dependency) => dependency.replace('@sqwiromobile/', ''));

  for (const businessApp of businessApps) {
    const srcDir = path.resolve(
      __dirname,
      `./node_modules/@sqwiromobilebusinessapps/${businessApp}/src`
    );
    const appDir = path.resolve(
      __dirname,
      `./@sqwiromobile/businessapps/${businessApp}`.replace(
        '/rootapp',
        '/_rootapp'
      )
    );

    await linkApp({
      srcDir,
      appDir,
      appName: `@sqwiromobilebusinessapps/${businessApp}`,
    });
  }

  for (const superAdminApp of superAdminApps) {
    const srcDir = path.resolve(
      __dirname,
      `./node_modules/@sqwiromobilesuperadminapps/${superAdminApp}/src`
    );

    const appDir = path.resolve(
      __dirname,
      `./@sqwiromobile/superadminapps/${superAdminApp}`.replace(
        '/rootapp',
        '/_rootapp'
      )
    );

    await linkApp({
      srcDir,
      appDir,
      appName: `@sqwiromobilesuperadminapps/${superAdminApp}`,
    });
  }

  for (const customApp of customApps) {
    const srcDir = path.resolve(
      __dirname,
      `./node_modules/@sqwiromobilecustomapps/${customApp}/src`
    );

    const appDir = path.resolve(
      __dirname,
      `./@sqwiromobile/customapps/${customApp}`.replace('/rootapp', '/_rootapp')
    );

    await linkApp({
      srcDir,
      appDir,
      appName: `@sqwiromobilecustomapps/${customApp}`,
    });
  }

  for (const apiApp of apiApps) {
    const srcDir = path.resolve(
      __dirname,
      `./node_modules/@sqwiromobileapiapps/${apiApp}/src`
    );

    const appDir = path.resolve(
      __dirname,
      `./@sqwiromobile/apiapps/${apiApp}`.replace('/rootapp', '/_rootapp')
    );

    await linkApp({
      srcDir,
      appDir,
      appName: `@sqwiromobileapiapps/${apiApp}`,
    });
  }

  for (const userApp of userApps) {
    const srcDir = path.resolve(
      __dirname,
      `./node_modules/@sqwiromobileuserapps/${userApp}/src`
    );

    const appDir = path.resolve(
      __dirname,
      `./@sqwiromobile/userapps/${userApp}`.replace('/rootapp', '/_rootapp')
    );

    await linkApp({
      srcDir,
      appDir,
      appName: `@sqwiromobileuserapps/${userApp}`,
    });
  }

  for (const coreapp of coreapps) {
    const srcDir = path.resolve(
      __dirname,
      `./node_modules/@sqwiromobile/${coreapp}/src`
    );

    const appDir = path.resolve(__dirname, `./@sqwiromobile/${coreapp}`);

    await linkApp({
      srcDir,
      appDir,
      appName: `@sqwiromobile/${coreapp}`,
    });
  }
}

void postinstall();
