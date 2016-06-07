module.exports = function(grunt) {
  'use strict';
  // Force use of Unix newlines
  grunt.util.linefeed = '\n';
  // Set default file encoding utf-8.
  grunt.file.defaultEncoding = 'utf-8';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          base: '.',
          keepalive:true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  grunt.registerTask('default', ['connect']);
};