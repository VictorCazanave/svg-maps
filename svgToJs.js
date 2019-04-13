const path = require('path')
const fs = require('fs')
const svgson = require('svgson')

/**
 * Convert SVG file into JS file
 * 
 * @param {string} dir - Name of directory
 * @param {string} file - Name of SVG file
 */
const svgToJs = (dir, file) => {
  const svgFile = path.join(__dirname, 'packages', dir, file)
  const jsFile = path.join(__dirname, 'packages', dir, 'index.js')

  if (fs.existsSync(jsFile)) {
    console.log(`File ${jsFile} already exists`)
    return
  }

  fs.readFile(svgFile, 'utf8', (err, data) => {
    if (err) {
      console.error(`Unable to read file ${svgFile}`, err)
      return
    }
    console.log(`Parsing file ${svgFile}`)
    svgson.parse(data)
      .then(json => {
        const obj = {
          label: json.attributes['aria-label'],
          viewBox: json.attributes.viewBox,
          locations: json.children
            .filter(child => {
              if (child.name !== 'path') {
                console.warn(`<${child.name}> tag will be ignored`)
                return false
              }

              return true
            })
            .map(child => ({
              name: child.attributes.name,
              id: child.attributes.id,
              path: child.attributes.d,
            }))
        }
        const js = `export default ${JSON.stringify(obj)}`

        console.log(`Writing file ${jsFile}`)
        fs.writeFile(jsFile, js, 'utf8', err => {
          if (err) {
            console.error(`Unable to write file ${jsFile}`, err)
            return
          }
        })
      }).catch(err => {
        console.error(`Unable ton parse file ${svgFile}`, err)
      })
  })
}

// Read packages directory
fs.readdir(path.join(__dirname, 'packages'), (err, dirs) => {
  if (err) {
    console.log('Unable to scan packages directory', err)
    return
  }

  // Read all sub directories
  dirs.forEach((dir) => {
    fs.readdir(path.join(__dirname, 'packages', dir), (err, files) => {
      if (err) {
        console.log(`Unable to scan directory ${dir}`, err)
        return
      }

      // Convert all SVG files to JS files
      files.forEach(file => {
        if (path.extname(file) === '.svg') {
          svgToJs(dir, file)
        }
      })
    })
  })
})





