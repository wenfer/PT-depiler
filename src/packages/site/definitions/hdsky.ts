import { ETorrentStatus, extractContent, ISiteMetadata, ITorrent } from "@ptd/site";
import NexusPHP, {
  CategoryInclbookmarked,
  CategoryIncldead,
  CategorySpstate,
  SchemaMetadata,
} from "@ptd/site/schemas/NexusPHP.ts";

export const siteMetadata: ISiteMetadata = {
  ...SchemaMetadata,

  version: 1,
  id: "hdsky",
  name: "HDSky",
  description: "高清发烧友后花园PT",
  tags: ["影视", "纪录片", "综合"],

  type: "private",
  schema: "NexusPHP",

  urls: ["https://hdsky.me/"],

  category: [
    {
      name: "类别",
      key: "cat",
      options: [
        { value: 401, name: "Movies/电影" },
        { value: 404, name: "Documentaries/纪录片" },
        { value: 410, name: "iPad/iPad影视" },
        { value: 405, name: "Animations/动漫" },
        { value: 402, name: "TV Series/剧集(分集）" },
        { value: 411, name: "TV Series/剧集(合集）" },
        { value: 403, name: "TV Shows/综艺" },
        { value: 406, name: "Music Videos/音乐MV" },
        { value: 407, name: "Sports/体育" },
        { value: 408, name: "HQ Audio/无损音乐" },
        { value: 409, name: "Misc/其他" },
        { value: 412, name: "TV Series/海外剧集(分集）" },
        { value: 413, name: "TV Series/海外剧集(合集）" },
        { value: 414, name: "TV Shows/海外综艺(分集）" },
        { value: 415, name: "TV Shows/海外综艺(合集）" },
        { value: 416, name: "Shortplay/短剧" },
      ],
      cross: { mode: "append" },
    },
    {
      name: "媒介",
      key: "medium",
      options: [
        { value: 1, name: "UHD Blu-ray" },
        { value: 14, name: "UHD Blu-ray/DIY" },
        { value: 12, name: "Blu-ray/DIY" },
        { value: 3, name: "Remux" },
        { value: 7, name: "Encode" },
        { value: 5, name: "HDTV" },
        { value: 6, name: "DVDR" },
        { value: 8, name: "CD" },
        { value: 4, name: "MiniBD" },
        { value: 9, name: "Track" },
        { value: 11, name: "WEB-DL" },
        { value: 15, name: "SACD" },
        { value: 2, name: "HD DVD" },
        { value: 16, name: "3D Blu-ray" },
      ],
      cross: { mode: "append" },
    },
    {
      name: "编码",
      key: "codec",
      options: [
        { value: 1, name: "H.264/AVC" },
        { value: 13, name: "x265" },
        { value: 10, name: "x264" },
        { value: 12, name: "HEVC" },
        { value: 2, name: "VC-1" },
        { value: 4, name: "MPEG-2" },
        { value: 3, name: "Xvid" },
        { value: 11, name: "Other" },
        { value: 14, name: "MVC" },
        { value: 15, name: "ProRes" },
        { value: 17, name: "VP9" },
        { value: 16, name: "AV1" },
      ],
      cross: { mode: "append" },
    },
    {
      name: "音频编码",
      key: "audiocodec",
      options: [
        { value: 10, name: "DTS-HDMA" },
        { value: 16, name: "DTS-HDMA:X 7.1" },
        { value: 17, name: "TrueHD Atmos" },
        { value: 19, name: "PCM" },
        { value: 11, name: "TrueHD" },
        { value: 3, name: "DTS" },
        { value: 13, name: "LPCM" },
        { value: 1, name: "FLAC" },
        { value: 2, name: "APE" },
        { value: 4, name: "MP3" },
        { value: 5, name: "OGG" },
        { value: 6, name: "AAC" },
        { value: 12, name: "AC3/DD" },
        { value: 7, name: "Other" },
        { value: 14, name: "DTS-HD HR" },
        { value: 15, name: "WAV" },
        { value: 18, name: "DSD" },
        { value: 22, name: "Opus" },
        { value: 20, name: "E-AC3" },
        { value: 21, name: "DDP with Dolby Atmos" },
        { value: 23, name: "ALAC" },
      ],
      cross: { mode: "append" },
    },
    {
      name: "分辨率",
      key: "standard",
      options: [
        { value: 5, name: "4K/2160p" },
        { value: 1, name: "2K/1080p" },
        { value: 2, name: "1080i" },
        { value: 3, name: "720p" },
        { value: 4, name: "SD" },
        { value: 6, name: "8K/4320P" },
      ],
      cross: { mode: "append" },
    },
    {
      name: "制作组",
      key: "team",
      options: [
        { value: 6, name: "HDSky/原盘DIY小组" },
        { value: 1, name: "HDS/重编码及remux小组" },
        { value: 28, name: "HDS3D/3D重编码小组" },
        { value: 9, name: "HDSTV/电视录制小组" },
        { value: 31, name: "HDSWEB/网络视频小组" },
        { value: 18, name: "HDSPad/移动视频小组" },
        { value: 22, name: "HDSCD/无损音乐小组" },
        { value: 34, name: "HDSpecial|稀缺资源" },
        { value: 24, name: "Original/自制原创资源" },
        { value: 27, name: "Other/其他制作组或转发资源" },
        { value: 26, name: "Autoseed/自动发布机器人" },
        { value: 30, name: "BMDru小组" },
        { value: 25, name: "AREA11/韩剧合作小组" },
        { value: 33, name: "Request/应求发布资源" },
        { value: 35, name: "HDSWEB/(网络视频小组合集专用)" },
        { value: 36, name: "HDSAB/有声书小组" },
        { value: 37, name: "HDSWEB/(补档专用)" },
      ],
      cross: { mode: "append" },
    },
    CategoryIncldead,
    CategorySpstate,
    CategoryInclbookmarked,
  ],

  search: {
    ...SchemaMetadata.search!,
    selectors: {
      ...SchemaMetadata.search!.selectors!,
      id: {
        selector: 'form[action*="download.php"]:first',
        attr: "action",
        filters: [{ name: "querystring", args: ["id"] }],
      },
      url: {
        selector: 'form[action*="download.php"]:first',
        attr: "action",
        filters: [
          { name: "querystring", args: ["id"] },
          { name: "perpend", args: ["/details.php?id="] },
        ],
      },
      subTitle: {
        text: "",
        selector: ["a[href*='hit'][title]", "a[href*='hit']:has(b)"],
        elementProcess: (element) => {
          const testSubTitle = element.parentElement!.innerHTML.split("<br>");
          if (testSubTitle && testSubTitle.length > 1) {
            const subTitleHtml = testSubTitle[testSubTitle.length - 1];

            // 移除 span.optiontag 的内容
            const div = document.createElement("div");
            div.innerHTML = subTitleHtml;
            div.querySelectorAll("span.optiontag").forEach((el) => el.parentElement!.remove());
            const noTagSubTitle = extractContent(div.innerHTML).trim();

            // 移除 [优惠剩余时间：17时50分] [ promotion will end in 23 hours 16 mins] [優惠剩餘時間：23時16分] 内容
            return noTagSubTitle.replace(/\[(优惠剩余时间| promotion will end in | 優惠剩餘時間).*\]/g, "").trim();
          }
          return "";
        },
      },
      link: {
        selector: 'form[action*="download.php"]:first',
        attr: "action",
      },
      progress: {
        selector: ["div.progressseeding, div.progressfinished, div.progressdownloading, div.progressdownloaded"],
        attr: "style",
        filters: [
          (query: string | undefined) => {
            query = query || "";
            const queryMatch = query.match(/width:([ \d.]+)%/);
            return queryMatch && queryMatch.length >= 2 ? parseFloat(queryMatch[1]) : 0;
          },
        ],
      },
      status: {
        text: ETorrentStatus.unknown,
        selector: ['div[class^="progress"]'],
        case: {
          ".progressseeding": ETorrentStatus.seeding,
          ".progressdownloading": ETorrentStatus.downloading,
          ".progressfinished": ETorrentStatus.completed,
          ".progressdownloaded": ETorrentStatus.inactive,
        },
      },

      ext_douban: { selector: ["a[href*='douban.com']"], attr: "href", filters: [{ name: "extDoubanId" }] },
      ext_imdb: { selector: ["a[href*='imdb.com']"], attr: "href", filters: [{ name: "extImdbId" }] },
    },
  },

  detail: {
    selectors: {
      link: {
        selector: 'form[action*="download.php"]:first',
        attr: "action",
      },
    },
  },

  download: {
    requestConfig: {
      method: "POST",
    },
  },
};

export default class Hdsky extends NexusPHP {
  override async getTorrentDownloadLink(torrent: ITorrent): Promise<string> {
    if (torrent.link) {
      // FIXME 这里假定下载链接有效期10分钟（具体不明）
      const linkCreatedTime = this.runQueryFilters(torrent.link, [{ name: "querystring", args: ["t"] }]) as string;

      const currentTimestamp = Date.now() / 1000;
      const expiredTimestamp = parseInt(linkCreatedTime) + 10 * 60;

      if (currentTimestamp < expiredTimestamp) {
        return torrent.link;
      } else {
        delete torrent.link;
      }
    }

    return super.getTorrentDownloadLink(torrent);
  }
}
