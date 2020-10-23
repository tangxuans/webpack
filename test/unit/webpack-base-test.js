const assert = require('assert')
describe('webpack.base.js test case',()=>{

    const baseConfig = require('../../lib/webpack.base.js')
    console.log("baseConfig",baseConfig)

    it('entry',()=>{
        assert.equal(baseConfig.entry.index,'/Users/wumao/学习/webpack/my-project1/builder-webpack/test/smoke/template/src/index/index.js')
        assert.equal(baseConfig.entry.search,'/Users/wumao/学习/webpack/my-project1/builder-webpack/test/smoke/template/src/search/index.js')
    })
})