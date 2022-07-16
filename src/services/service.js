import Http from "../server/server";
import { authHeader } from "../helpers/auth_header"

class Service {
    register(data) {
        return Http.post("users/signup", data)
    }

    login(data) {
        return Http.post("users/signin", data)
    }

    getUsers(data) {
        return Http.post("users/get", data, { headers: authHeader() })
    }
    getUnits(data) {
        return Http.post("aplications/getbyguid", data, { headers: authHeader() })
    }

    getUsersByGuid(data) {
        return Http.post("users/getbyguid", data, { headers: authHeader() })
    }

    deleteUsers(id) {
        return Http.delete("users/delete/"+id, { headers: authHeader() })
    }

    updateUsers(id, data) {
        return Http.put("users/update/"+id, data, { headers: authHeader() })
    }

    addApplication(data) {
        return Http.post("aplications/add", data, { headers: authHeader() })
    }

    getApplication(data) {
        return Http.post("aplications/get", data, { headers: authHeader() })
    }

    getApplicationByGuid(data) {
        return Http.post("aplications/getbyguid", data, { headers: authHeader() })
    }

    deleteApplication(id) {
        return Http.delete("aplications/delete/"+id, { headers: authHeader() })
    }

    updateApplication(id, data) {
        return Http.put("aplications/update/"+id, data, { headers: authHeader() })
    }
    getAbent(data) {
        return Http.post("absent/get",data, { headers: authHeader() })
    }
    getAbentDetail(data) {
        return Http.post("absent/getdetail",data, { headers: authHeader() })
    }
}

export default new Service();