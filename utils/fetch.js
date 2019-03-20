module.exports = (url, type, data) => {
  return new Promise((resolve, reject)=> {
    wx.request({
      url: url,
      header: {
        "Content-Type": "json"
      },
      data:data,
      method: type,
      dataType: "json",
      success: resolve,
      fail: reject
    })
  })
}