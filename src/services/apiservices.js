import services from "./service";
class Api {
  getabsent(data) {
    services
      .getAbent(data)
      .then((res) => {
        // console.log(res.data)
        var response = res.data;
        return response;
      })
      .catch((err) => {
        return [{}];
      });
  }
}

export default new Api();
