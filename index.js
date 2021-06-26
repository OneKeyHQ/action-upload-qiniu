const core = require('@actions/core');
const qiniu = require('qiniu');
const upload = require('./upload');

function generatePutPolicyToken(bucket, ak, sk) {
  const mac = new qiniu.auth.digest.Mac(ak, sk);

  const putPolicy = new qiniu.rs.PutPolicy({
    scope: bucket,
  });
  return putPolicy.uploadToken(mac);
}

async function main() {
  try {
    const ak = core.getInput('ak');
    const sk = core.getInput('sk');
    const bucket = core.getInput('bucket');
    const sourceDir = core.getInput('source_dir');
    const targetDir = core.getInput('target_dir');

    const token = generatePutPolicyToken(bucket, ak, sk);
    const config = new qiniu.conf.Config();
    const uploader = new qiniu.form_up.FormUploader(config);

    await upload(
      uploader,
      token,
      sourceDir,
      targetDir,
    );

    console.log('====== all file uploaded! =====');
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
}

main();