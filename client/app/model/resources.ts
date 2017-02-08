/**
 * Created by thinhth2 on 2/8/2017.
 */


class ResourcesBundleVN {
    existAccount = "Tên tài khoản đã tồn tại";
    tryAgain = "Có lỗi xảy ra, vui lòng thử lại!";
}

export class Resources {

    static bundle = new ResourcesBundleVN();

    static get(key) {
        return Resources.bundle[key];
    }
}