import { rest } from 'msw'

export const staticMetaData = [
  rest.get('/v1/nauth/system/portals/ui/BBB/public/:type', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          lin_img_1_file_nm: null,
          lin_img_3_stor_path: null,
          ptal_bg_stor_path: null,
          lin_img_2_yn: 'N',
          ptal_bg_file_nm: 'AX4HPy.jpg',
          lin_img_usg_yn: 'Y',
          tnt_nm: 'test-tenant-02',
          usr_ui_div_cd: 'A016BAS',
          ptal_img_stor_path: null,
          lin_img_2_basic_yn: 'Y',
          lin_bg_file_nm: '1311997063_wallpaper.jpg',
          lin_img_3_file_nm: null,
          lin_img_2_file_nm: null,
          ptal_img_file_id: null,
          ptal_img_basic_yn: 'Y',
          lin_show_detl: 'Copyright 2018 ⓒ SK BROADBAND Co. LTD.',
          lin_img_1_yn: 'N',
          ptal_bg_file_id: '202205283b8c9f',
          lin_img_3_yn: 'N',
          lin_img_3_basic_yn: 'Y',
          ptal_bg_basic_yn: 'N',
          lin_img_1_file_id: null,
          lin_img_2_stor_path: null,
          ptal_img_yn: 'N',
          lin_bg_basic_yn: 'N',
          lin_bg_file_id: '2022050898b07c',
          tnt_id: 'BBB',
          lin_img_1_stor_path: null,
          lin_img_2_file_id: null,
          ptal_bg_yn: 'Y',
          lin_bg_yn: 'Y',
          ptal_img_file_nm: null,
          lin_img_3_file_id: null,
          lin_img_1_basic_yn: 'Y',
          lin_bg_stor_path: null
        }
      })
    )
  })
]
