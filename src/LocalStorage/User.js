class User{
    SaveUser(data) {
        var detailuser = JSON.parse(data);
        localStorage.setItem('data', data);
        localStorage.setItem('is_active', true);
        localStorage.setItem('role', detailuser.role);
    }
    Logout() {
        localStorage.clear();
    }

    SaveRole(data) {
        localStorage.setItem('role', data);
    }
    SaveLogin(data) {
        localStorage.setItem('isLogin', true);
    }
    SaveToken(data) {
        localStorage.setItem('token',data)
    }
}
export default new User();