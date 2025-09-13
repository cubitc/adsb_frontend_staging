import PackageInfoModel from "./package-info-model";

export default interface StandardPackageListModel {
  has_active_package?: boolean | null;
  package_infos?: PackageInfoModel | null;
  email?: string | null;
}
