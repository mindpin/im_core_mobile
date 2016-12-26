/*
 * @providesModule IcmPage
 */

import ErrorPage    from 'im_core_mobile/app/pages/error_page'
import StudyPage    from 'im_core_mobile/app/pages/dashboard/study_page'
import SignIn       from 'im_core_mobile/app/pages/users/sign_in_page'
import UserDetail   from 'im_core_mobile/app/pages/dashboard/detail_page'
import UserEdit     from 'im_core_mobile/app/pages/users/edit_page'
import FaqPage      from 'im_core_mobile/app/pages/dashboard/faq_page'
import Dashboard    from 'im_core_mobile/app/pages/dashboard'
import VideoPage    from 'im_core_mobile/app/pages/view_files/video_page'
import ImagePage    from 'im_core_mobile/app/pages/view_files/image_page'
import FileTypeNotSupportedPage from 'im_core_mobile/app/pages/view_files/file_type_not_supported_page'
import ReferenceFileNotExitedPage from 'im_core_mobile/app/pages/view_files/reference_file_not_exist_page'
import ConceptList  from 'im_core_mobile/app/pages/concept_list'


export default {
  StudyPage,
  FaqPage,
  Dashboard,
  SignIn,
  UserDetail,
  UserEdit,
  VideoPage,
  ImagePage,
  ConceptList,
  FileTypeNotSupportedPage,
  ReferenceFileNotExitedPage,
}
