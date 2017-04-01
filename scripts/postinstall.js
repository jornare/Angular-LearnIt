var fs = require('fs'),
    angularComponents = angularPaths([
        'animations',
        ['animations', 'animations-browser'],
        'core',
        'common',
        'compiler',
        'platform-browser',
        ['platform-browser', 'platform-browser-animations'],
        'platform-browser-dynamic',
        'http',
        'router',
        'forms']),
    polyfills = [
        './node_modules/rxjs/bundles/Rx.min.js',
        './node_modules/core-js/client/shim.min.js',
        './node_modules/zone.js/dist/zone.js',
        './node_modules/reflect-metadata/Reflect.js'
        ],
    tsCompiler = [
        './node_modules/traceur/bin/traceur.js',
        './node_modules/systemjs/dist/system.src.js',
        './node_modules/typescript/lib/typescript.js'
    ],
    angularInMemoryWebApi = [
        './node_modules/angular-in-memory-web-api/index.js',
        './node_modules/angular-in-memory-web-api/http-status-codes.js',
        './node_modules/angular-in-memory-web-api/in-memory-backend.service.js',
        './node_modules/angular-in-memory-web-api/in-memory-web-api.module.js',
    ],
    angularMaterial = [
        './node_modules/hammerjs/hammer.min.js',
        './node_modules/@angular/material/bundles/material.umd.js',
    ]
    ;



merge('./lib/angular.bundle.js',
    polyfills
        .concat(angularComponents)
);

merge('./lib/angular.bundle.ts.js',
    polyfills
        .concat(tsCompiler)
        //.concat(angularComponents)
);

merge('./lib/angular-in-memory-web-api.js',
    angularInMemoryWebApi
);

merge ('./lib/angular.material.bundle.js',
    angularMaterial);

function merge(output, files) {
    var data = '', i;
    for (i = 0; i < files.length; i++) {
        data += fs.readFileSync(files[i]) + '\n';
    }
    fs.writeFileSync(output, data);
}

function angularPaths(mods) {
    var result = [], folder, package;
    for (i = 0; i < mods.length; i++) {
        folder = typeof mods[i] == 'string' ? mods[i] : mods[i][0];
        package = typeof mods[i] == 'string' ? mods[i] : mods[i][1];
        result.push(
            './node_modules/@angular/' + folder + '/bundles/' + package + '.umd.min.js'
        );
    }
    return result;
}