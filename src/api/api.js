let api = {
    //权限
    // getRoleAcls: { url: 'getRoleAcls', method: 'get' },
    // getAcls: { url: 'acls', method: 'get' },
    // putAcls: { url: 'acls/:id', method: 'put' },
    // postAclsParent: { url: 'acls', method: 'post' },
    // setAclStatus: { url: 'setAclStatus', method: 'post' },
    // delectAcls: { url: 'acls/:id', method: 'delete' },
    // getUserAclTree: { url: 'getUserAclTree', method: 'get' },
};

for (var k in api) {
    let urlHost = window.htp.apihost;
    let url = api[k].url;

    if (process.env.NODE_ENV === 'development') {
        urlHost = '/proxy/';
    }
    api[k].url = urlHost + url;
}

export default api;
