# action-upload-qiniu
auto upload to qiniu bucket in github action.

### usage

```yml
- name: Deploy to CDN
  uses: onekeyhq/action-upload-qiniu@master
  with:
    ak: ${{ secrets.QINIU_ACCESS_KEY }}
    sk: ${{ secrets.QINIU_SECRET_KEY }}
    bucket: ${{ secrets.QINIU_BUCKET }}
    # source directory
    source_dir: './build'
    # path prefix for target file
    target_dir: '/fe/discover/${{ github.sha }}'
```
