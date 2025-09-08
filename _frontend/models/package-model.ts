import PackageInfoModel from "./package-info-model";

export default interface PackageModel {
  has_active_package?: boolean | null;
  package_infos?: PackageInfoModel | null;
}
