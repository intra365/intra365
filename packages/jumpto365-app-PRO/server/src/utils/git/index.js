'use strict';
var dir = require('node-dir');
var nodegit = require("nodegit");
var _ = require("lodash")
var parseMarkdown = (markdown) => {
    var FrontMatterStart = markdown.indexOf("---")
    var FrontMatterEnd = markdown.indexOf("---",FrontMatterStart + 3)
    var body = markdown.substring(FrontMatterEnd+3)    
    var header = markdown.substring(FrontMatterStart+3,FrontMatterEnd-FrontMatterStart)
    var frontMatter = {}
    var properties = header.split("\n")

    properties.forEach(property => {
        var colon = property.indexOf(": ")
        if (colon > 0){
            var tag = property.substring(0,colon).trim()
            var value = property.substring(colon+2).trim()
            frontMatter[tag] = value
        }
    });

    var md = {
        properties : frontMatter,
        body : body
    }
    return md
}


var git = {}

git.ping = (input) => {
    return input
}
git.parseMarkdown = parseMarkdown

git.clone = (cb) => {

    nodegit.Clone("https://github.com/Hexatown/docs", __dirname + "/docs").then(function (repo) {
        cb(null,repo)
    }).catch(function (err) {
        cb(err)

    })
}

git.status = (cb) => {

    nodegit.repo.open(__dirname + "/docs").then(function (repo) {
        nodegit.Status.file(repo)
        .then(function(x,y,z){

//Git.Merge(repo)

            cb(null)
        })
        
    }).catch(function (err) {
        cb(err)

    })
}

git.pull = (cb) => {

    nodegit.repo.open(__dirname + "/docs").then(function (repo) {
        repo.fetchAll()
        .then(function (a,b,c){
        repo.mergeBranches("master","origin/master")
        .then(function(x,y,z){

//Git.Merge(repo)

            cb(null)
        })
    })
    }).catch(function (err) {
        cb(err)

    })
}

git.commit = (cb) => {

    var repo;
    var index;
    var oid;
    
    nodegit.repo.open(__dirname + "/docs")
    .then(function(repo) {})
    .then(function() {
      return repo.refreshIndex();
    })
    .then(function(indexResult) {
      index = indexResult;
    })
    .then(function() {
      // this file is in the root of the directory and doesn't need a full path
      return index.addByPath(fileName);
    })
    .then(function() {
      // this file is in a subdirectory and can use a relative path
      return index.addByPath(path.posix.join(directoryName, fileName));
    })
    .then(function() {
      // this will write both files to the index
      return index.write();
    })
    .then(function() {
      return index.writeTree();
    })
    .then(function(oidResult) {
      oid = oidResult;
      return nodegit.Reference.nameToId(repo, "HEAD");
    })
    .then(function(head) {
      return repo.getCommit(head);
    })
    .then(function(parent) {
      var author = nodegit.Signature.create("Niels Johansen",
        "niels@timeboxer.dk", 123456789, 60);
      var committer = nodegit.Signature.create("Niels Gregers Johansen",
        "niels@timeboxer.dk", 987654321, 90);
    
      return repo.createCommit("HEAD", author, committer, "message", oid, [parent]);
    })
    .done(function(commitId) {
      console.log("New Commit: ", commitId);
    });


}

git.iterate = (root,cb) => {
    function elmentFromEnd(elements,pos){
        if (!elements) return null
        if (elements.length <= pos) return null
        return elements[elements.length-pos-1]
    }
    function extention(path) {
        
        var e = path.split(".")
        return e[e.length-1]
    }

    function directory(path) {
        
        var e = path.lastIndexOf("\\")
        return path.substring(0,e)
    }

    function name(path) {
        var e1 = path.split("\\")
        var last = e1[e1.length-1]
        var e = last.split(".")
        return e[0]
    }

    dir.files(root, function (err, files) {
        if (err) return cb( err);
        var fileInfo = []
        files.forEach(file => {
            var elements = file.split("\\")
            
            fileInfo.push( {
                path : file,
                elements: elements,
                extention : extention(file).toLowerCase(),
                name:  name(file).toLowerCase(),
                directory :directory(file),
                area1 : elmentFromEnd(elements,1).toLowerCase(),
                area2 : elmentFromEnd(elements,2).toLowerCase(),
                area3 : elmentFromEnd(elements,3).toLowerCase(),
                area4 : elmentFromEnd(elements,4).toLowerCase(),
            }    )
        });
        
        return cb(null,fileInfo);
    });

}

module.exports = git



