const fs = require("fs");

const File = {};

File.createDirectory = (dirPath) => {
  if (!File.checkFolderExists(dirPath)) {
    try {
      fs.mkdirSync(dirPath);
    } catch (e) {
      console.error("Unable to create directory", dirPath, e.stack);
      throw new Error(e);
    }
  }

  return true;
};

File.checkFolderExists = (path) => {
  return fs.existsSync(path);
};

File.createFile = (args) => {
  try {
    fs.writeFileSync(args.directory + "/" + args.fileName, args.data);

    return true;
  } catch (e) {
    console.error("Unable to create file", args, e.stack);
    return false;
  }
};

File.copyFile = (args) => {
  try {
    fs.copyFileSync(args.orignalPath, args.directory + "/" + args.fileName);
    fs.unlinkSync(args.orignalPath);
    return true;
  } catch (e) {
    console.error(e.stack);
    return false;
  }
};

File.deleteFile = (args) => {
  try {
    fs.unlinkSync(args.filePath);
  } catch (e) {
    console.error("Unable to remove file", e.stack);
  }
};

module.exports = File;
