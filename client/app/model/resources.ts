/**
 * Created by thinhth2 on 2/8/2017.
 */


class ResourcesBundleVN {
    existAccount = "Tên tài khoản đã tồn tại";
    tryAgain = "Có lỗi xảy ra, vui lòng thử lại!";
    colors = {
        COLOR_ME: 0xFFCC33,
        COLOR_PARTNER: 0xFF9966,
        COLOR_COMPETITOR: 0xFFFFFF
    };
}

export class Resources {

    static bundle = new ResourcesBundleVN();

    static get(key) {
        return Resources.bundle[key];
    }
}