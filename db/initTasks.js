const Task = require('../models/taskModel');
const User = require('../models/userModel');

const initTasks = async () => {
    const userCase1 = await User.findOne({ email: 'user1@example.com' }).select('lastName firstName phone email');
    const userCase2 = await User.findOne({ email: 'user2@example.com' }).select('lastName firstName phone email');
    const userCase3 = await User.findOne({
        email: 'chiayu@example.com',
    }).select('lastName firstName phone email');
    const userCase4 = await User.findOne({
        email: 'yunshan@example.com',
    }).select('lastName firstName phone email');
    const userCase5 = await User.findOne({ email: 'weiyu@example.com' }).select('lastName firstName phone email');
    const tasks = [
        {
            userId: userCase1._id,
            status: 'confirmed',
            title: '急！幫忙代購王國之淚',
            category: '排隊代購',
            description: '很急，5/11 晚上請在信義店前排隊代購，12:00準時想拿到遊戲片',
            salary: 300,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/7d6df9b6-ac30-4ece-942a-a070f2b929af.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=QejWgLmbVbSANXfrP8AFyipT2qoGV0qML%2FtJ1g8%2FczHZkF4pl6VUGNiFK%2FkISJdWysIbT5qXvSVgBaN%2FxUXs3uSJzrtgbl8FQKnudKTqYf8kNiPvIPbJoX58SotSiPxFiRCcJjiPSkXl%2F70VcipyFPe9MrZSBSvUHtLfiS3xWMZO1j%2FesZRSosAX8ZsSHqrea0IcfitWcoFYr9T3LK1RKeuGrao%2B7aFNKhqN5rJSUMY1ADP3MmRYwwY4VugC8kmrZ7DtjCyzijW2NE9vCG169ZVsrC%2BoxSv9FQwwGRtrAkBG31EPS4hKV9nDv4WxcHAC4xTK7YGLyee5jaz37SQNLg%3D%3D',
                      'https://storage.googleapis.com/superhandy.appspot.com/images/737e231e-69a0-4fa3-a5f3-1df85558bf7e.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=pbnuAnhwz2pzMbb0y8APg9OM0k1lA924jN9Flot%2B6vTyesi1R5Nm0n6HA1tFaed4c%2BN8MFeYGoUZmH8ml7yvyWspGirZ9WVpVSnJS6ecnKlCZh7V2tpHqBMR71w7NIaMt1%2FB6k%2F8x9O80iCMmpmSGkxGPJ%2BuBS5SZ8ATupE3j1MdGF2duDupEkj9%2F6mSMWhdwAK5XEXFUwKkk6g1wcpEJ7JlsOLvF%2BjikuRIghQB7nL7sBs43MxpR1rRDvdg76p2hwcrmi2q2EdEKQZpp%2BKAE7oXrT8rcxl9vGxwIJmtw4htYiCqOektPYQHPXR9hBatLOOV0j8hbDPOmAYhG8xHNQ%3D%3D'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '信義區',
                address: '臺北市信義區松智路17號',
                longitude: 121.5659555,
                latitude: 25.0343073,
            },
            isUrgent: true,
            helpers: [
                {
                    helperId: userCase2._id,
                    status: 'paired',
                },
                {
                    helperId: userCase3._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase5._id,
                    status: 'unpaired',
                },
            ],
            time: {
                createdAt: new Date('2023-05-12T12:34:56'),
                updatedAt: new Date('2023-06-12T08:19:50'),
                publishedAt: new Date('2023-05-13T13:34:56'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2023-05-16T13:34:56'),
                submittedAt: new Date('2023-05-17T13:55:56'),
                confirmedAt: new Date('2023-05-19T19:15:50'),
                completedAt: null,
                expiredAt: new Date('2023-06-12T12:34:56'),
            },
            submittedInfo: [
                {
                    role: '幫手',
                    imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/c0da4c1b-e05c-49fa-b942-90c35ba75bb9.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=NU2w89IOhOQ4j%2Bo5PaIlksJOp8GbzHTRGXkGZPMEaPXRGE9aBKYZLMRArlZ2rV%2BIBylf%2FzfppcmUaOs5ccj8P0hZxgT4P29glScrZ%2BvZNdZLu4SrF6o1HdHWRlidGXDsM1RE6o1aiMHLtl2qKHYdBGao%2BS2tKGVQivNQn1Hvw23fGZdac82WPiKRFLF7DtB%2BShtaiu9PkXn0O2FtN09WVLHfe%2F2foWblwe2bt7JKZhJJQfXushOsEfyRugUk3qDlXk%2FWue2lj9pZY43DUhcpVRdGf%2Bdk4b0Rv1JjU6fCumnh48Yaub5H7FdPB5JomRjseiev3j7ZrzAFbf7MGWggow%3D%3D'],
                    comment: '這個任務簡單啦',
                    createAt: new Date('2023-05-17T13:55:56'),
                },
            ],
        },
        {
            userId: userCase1._id,
            status: 'published',
            title: '幫忙打王國之淚的Boss',
            category: '人力派遣',
            description: 'Boss 好難打，急徵高手幫忙，不可以花我太多素材，意者私聊',
            salary: 500,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/27cf2428-96dc-48ec-bb50-a14c59b44a5e.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=Ev8Mgk1SCQ8CeLj47jlDNJ6M4PU0FJ8LcZk9TMvVPPkFo6KAyod%2B2q8zaV4Hyg7tpKiKKORYxRN0%2FdA7vPMBBzKINxJYpVxMHVg94HmPx1pG28VREk%2FvyHuLiBpHtIfG8gEXFeJbY7%2FJqtLW%2FQDbCK8kKTLwkPRXFlFiAtDl%2BW1KQTu2l%2Bv%2BLvBPpUGYYdR40Wcd%2FYs0tN%2F8kd%2BL7UkKg8iNy3AxPohVlakv5xmHM32VvXWJWoxQ3wuy4FVPZ%2Fpebz7uwkjht5c9YHWol5GddRK%2BPHs5IcpecUvMitIMy%2Fr4tRiouq2Xahv6NqAN317GmsSvxWdKYvxhemNgpbzPKA%3D%3D',
                      'https://storage.googleapis.com/superhandy.appspot.com/images/655c362d-9b8c-4e2f-b289-f75917177525.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=kQz1YDHpwhIix8633VWCcYpssme3ldDH3TN5U9hM07Q2zzHy4LMwQEJ8akGegGpAv8vY%2BBGV4aYZ1hY4MiNWNHkafEwR7Wk8VYRMMYFcdeU7NRbv6U%2B5GUJKEFaZFs0xcajp1AJxsIYkuIc4JxqQZnBnhZH7jVBjnaMtWB%2B5WrNLcoRRpdzf64Ngf48KfCUoa7W8xAmTt51OblVX%2FzY1RxY9Q9v8n2PNBAn7Ge2JOLsCYQ%2B9QDMhkxhRefH9aXUkeEkZycstJWxEnm9rpKnmCpkpkrJeSmvw%2BdD42gFA5RVN8UVN%2Fag%2FS1AyRzR2M9RIXMAyVM1wtuX8fhAxRd1oFg%3D%3D',
                      'https://storage.googleapis.com/superhandy.appspot.com/images/5853640a-267a-4a0d-b3d8-30af4785643b.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=oIRETi1rIiaNhZUPJTdfvT5CbCYiRjYkZFqIm4pr7L7k%2FkamWokiuN4u42JXW7ud%2Fr%2BotSbU%2BzXbpRt4g9JzZqbA4ax85JZyoSQRKWsyWrx3CI5fexnLlf1u9q8uE2VLAjQyyJqOJol6fcBrzuhAjh25jDyPBwriZiAIOo4pYmdPGfSV1S9jUBgFXqAtZHvA%2BfQtLBc3cyE6viGJv4L5n%2FaZfynMwTZAsb2%2F56bo1z2xJ8guEm4ItjN%2BPLKyZg%2BZENiFoCA5zJ7aihMn%2BzWaPYB1Qkb1RiJakW8xLjEmSvdlLjpl9WaloXwXVQUftjrxuD%2Bm4qvH4pfNy3UsBEWSNA%3D%3D'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '信義區',
                address: '基隆路300號',
                longitude: 121.5644267,
                latitude: 25.0412214,
            },
            isUrgent: true,
            helpers: [
                {
                    helperId: userCase5._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase3._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase2._id,
                    status: 'waiting',
                },
            ],
            time: {
                createdAt: new Date('2023-04-30T12:34:56'),
                updatedAt: new Date('2023-05-12T08:19:50'),
                publishedAt: new Date('2023-05-10T13:34:56'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date('2023-05-30T12:34:56'),
            },
        },
        {
            userId: userCase1._id,
            status: 'completed',
            title: '陪我家狗玩',
            category: '寵物陪伴',
            description: '我家有黃金獵犬，但我這禮拜很忙，請幫我 2/20 早上 8 點來歌唱大樓找我，並帶他去附近公園陪他散步',
            salary: 300,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/ca47c054-c0cc-4246-97cb-e9b2806a35cb.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=F4nudMD87t41P%2FplEfViMONpnXzHzjiyul1iYk4tymohibhpolVuPjaSieatiDg311630Z4ZYUwir2jw5jD1OaCVo7QQXSz0mh3Pu18%2FE1VxdWH0GhrabdnVidjBbkdcqnUF8bTrSJic1%2F0paPfr1o7amcU7KhiiYbG%2BsxO1wMDLWZYOg3oOnUIBTZB99D4JrHdKhbUZtKshIKrB7yLuY2YSwaYdxJnNFM1WQUKy11RXILdhFz%2FJlJKGD0eWd70cuHk3fzb9E5i5J91EKqxMTXNg7zzr0AC6GbkROeVwCCBvh1HoneZlgpBn5ya0f%2BTObR8LMPmUpfi5oHTWdDt13w%3D%3D',
                      'https://storage.googleapis.com/superhandy.appspot.com/images/e3a8b396-1572-4a7a-9097-f3d0891539cf.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=SKsFvBRhTH0ze6GN4kNMjand2YwRIWpyWMafKcQI8y05EVmfQuIWamEK9A7is8xCYdE652TjNnkzDVOUQUjO%2FFnfmw3qa8TDaOdIoflmhHPUjC0nNIOIm%2FNL5JDFjxqrg2sYMBOeuddljt3Mj14dlidliRicAf4B6HES%2FLXvLQYsqELx1vbyhj8lhxZBIuvRR806SCtNxcvGQYlqY50e6InsiWEpxpiQNHoY6NCvs3Z1yZAbbKVK2a0Lr%2F0mNl4hRkDkOBYFyCQWpI2psAub3IE8Bo3EiNmbDDADqWBAblZlCexkh%2FfZBW4o0y6V5cqVcL87ppoZMvNIxafzMuFUIA%3D%3D'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '松山區',
                address: '臺北市松山區復興北路15號',
                longitude: 121.5442703,
                latitude: 25.0486251,
            },
            isUrgent: true,
            currentHelperId: userCase5._id,
            helpers: [
                {
                    helperId: userCase5._id,
                    status: 'paired',
                },
                {
                    helperId: userCase3._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase2._id,
                    status: 'unpaired',
                },
            ],
            time: {
                createdAt: new Date('2023-01-30T12:34:56'),
                updatedAt: new Date('2023-02-23T08:19:50'),
                publishedAt: new Date('2023-02-15T13:34:56'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2023-02-16T13:34:56'),
                submittedAt: new Date('2023-02-17T13:55:56'),
                confirmedAt: new Date('2023-02-19T19:15:50'),
                completedAt: new Date('2023-02-23T08:19:50'),
                expiredAt: new Date('2023-03-01T12:34:56'),
            },
            submittedInfo: [
                {
                    role: '幫手',
                    imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/e3a8b396-1572-4a7a-9097-f3d0891539cf.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=SKsFvBRhTH0ze6GN4kNMjand2YwRIWpyWMafKcQI8y05EVmfQuIWamEK9A7is8xCYdE652TjNnkzDVOUQUjO%2FFnfmw3qa8TDaOdIoflmhHPUjC0nNIOIm%2FNL5JDFjxqrg2sYMBOeuddljt3Mj14dlidliRicAf4B6HES%2FLXvLQYsqELx1vbyhj8lhxZBIuvRR806SCtNxcvGQYlqY50e6InsiWEpxpiQNHoY6NCvs3Z1yZAbbKVK2a0Lr%2F0mNl4hRkDkOBYFyCQWpI2psAub3IE8Bo3EiNmbDDADqWBAblZlCexkh%2FfZBW4o0y6V5cqVcL87ppoZMvNIxafzMuFUIA%3D%3D'],
                    comment: '你家的狗很乖很聽話',
                    createAt: new Date('2023-02-17T13:55:56'),
                },
            ],
        },
        {
            userId: userCase2._id,
            status: 'completed',
            title: '幫忙做畢業專題',
            category: '文書處理',
            description: '我目前正在進行一份有關自然語言處理的畢業專題，需要一位有相關經驗的助理幫忙實驗和分析數據。',
            salary: 1300,
            exposurePlan: '限時黃金曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/4ca420a9-244c-4afd-b15a-35f145cb7061.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=AehjIhyAp%2F3rApGEiybN9H9IdaSON6hQIKMhAluH%2F8h0QUmD5D2MB%2B%2BrPkh5TSR7aSIUKKklAMM8v2GZs%2BTpcrz8UkjDISCpq0wwBTios3Ce1dOpjEWTnQEKIHA4jc6bcs7fXYFuiVuaOfeS0lhJ0J%2BcZoHe4uasI3mdtVibiEsjXYQh%2FPw4nxo%2FDOo10oggIcxkW0VPnrWVj4tHv3fzeLWAF2FPCyRGas6zGGEvE62fsdw0aWEhYTUNIyllHTQPTsrWgaaXoe0R1KHigbtzkUEPdcGf5qhQTMcZj0t6n6nnvMR6jX%2FQmoPRxynCA50D7xZEm%2BWmtPtSFErNbjbLNw%3D%3D'],
            contactInfo: {
                name: `${userCase2.lastName}${userCase2.firstName}`,
                phone: userCase2.phone,
                email: userCase2.email,
            },
            location: {
                city: '臺北市',
                dist: '松山區',
                address: '臺北市松山區羅斯福路四段1號',
                longitude: 121.5339903,
                latitude: 25.0184919,
            },
            isUrgent: true,
            currentHelperId: userCase1._id,
            helpers: [
                {
                    helperId: userCase1._id,
                    status: 'paired',
                },
                {
                    helperId: userCase3._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase5._id,
                    status: 'unpaired',
                },
            ],
            time: {
                createdAt: new Date('2023-05-01T09:00:00'),
                updatedAt: new Date('2023-05-16T09:00:00'),
                publishedAt: new Date('2023-05-01T09:00:00'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2023-05-12T09:00:00'),
                submittedAt: new Date('2023-05-13T09:00:00'),
                confirmedAt: new Date('2023-05-14T09:00:00'),
                completedAt: new Date('2023-05-16T09:00:00'),
                expiredAt: new Date('2023-06-01T09:00:00'),
            },
            submittedInfo: [
                {
                    role: '幫手',
                    imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/3234e78e-7bff-4be8-854f-8ce28866892d.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=TC0LWwaA0INclWGIvqip3h5y5Bget8WQQE76NfEPE4jkw%2BIk9btuvnTYUz%2FYaKqOBPjBW%2FmrtQUDErNCN9PqlZTE2NoUxpkphgsBF%2FFqxLaSWhPKVHE%2BnUibAPONCGW3KWa2Ga4ryL0BMPhe1VrawXZ4j25mH5xBMY8wORThdrmhMI0Qq5%2Br1RXIW%2BOXLWLO6EFrktNUOhthSj62opeLekbiBIzbUzSRQz5PNPYBZ5dKLE4Y%2F8YzPg4hj%2F5RTS%2F5loP8UsnDh7nRII%2FezRV29yJ2KHResrc%2BtBhxA1snfSqNcLRQNfbNQ0tIe2XkdOy4X7N3jJdZpVpnV9D5MaxT2w%3D%3D'],
                    comment: '這份報告有夠難做，NLP 難啊',
                    createAt: new Date('2023-04-13T09:00:00'),
                },
            ],
        },
        {
            userId: userCase3._id,
            status: 'completed',
            title: '協助居家清潔',
            category: '清潔外包',
            description: '需要一位勤快且細心的人來協助居家清潔，家裡有一些難以清潔的區域需要特別注意。',
            salary: 666,
            exposurePlan: '一般曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/e68a9ee4-ce28-4dda-ac45-f7463113063e.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=Pr5wfciWCDqtwSKl05xMIgBsM%2FKgEkkeGCdmp%2BinNG%2BeWFHDZOL0d5tPxZYW1Y8hdiFBu83Q6cpMQ1M9xNCAeW%2BFeKehMe4JkYJBY42IhN%2BvreGpHexMVF2kGnqKVLoBCSfaT6Y%2B2Cw%2BQ%2FX3%2F7iXkHqEW%2BXkubSLl0SuEbScAwBZ%2FQykCGIxB5tH%2FjTbr1NFvzDgBWJJp9JuD2gRV28BgYMWLPWFDxufmMjxYQYKsv5d5CdYXBmmy5BHrD9%2FoTPyDUvrBNKoqIsW92ikT3TFfussHlkaKwyhU5taQ8AjF9pizAMcaBTXS0MWQ%2FP6kRVxfXjiFIpsIzPL7Bb7I5zxeA%3D%3D'],
            contactInfo: {
                name: `${userCase3.lastName}${userCase3.firstName}`,
                phone: userCase3.phone,
                email: userCase3.email,
            },
            location: {
                city: '新北市',
                dist: '板橋區',
                address: '新北市板橋區新站路20號',
                landmark: '板橋火車站',
                longitude: 121.4663595,
                latitude: 25.0132041,
            },
            isUrgent: false,
            currentHelperId: userCase1._id,
            helpers: [
                {
                    helperId: userCase1._id,
                    status: 'paired',
                },
                {
                    helperId: userCase2._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase5._id,
                    status: 'unpaired',
                },
            ],
            time: {
                createdAt: new Date('2023-04-02T18:00:00'),
                updatedAt: new Date('2023-04-17T09:00:00'),
                publishedAt: new Date('2023-04-02T20:00:00'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2023-04-13T09:00:00'),
                submittedAt: new Date('2023-04-17T09:00:00'),
                confirmedAt: new Date('2023-04-18T09:00:00'),
                completedAt: new Date('2023-04-19T09:00:00'),
                expiredAt: new Date('2023-04-09T18:00:00'),
            },
            submittedInfo: [
                {
                    role: '幫手',
                    imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/e68a9ee4-ce28-4dda-ac45-f7463113063e.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=Pr5wfciWCDqtwSKl05xMIgBsM%2FKgEkkeGCdmp%2BinNG%2BeWFHDZOL0d5tPxZYW1Y8hdiFBu83Q6cpMQ1M9xNCAeW%2BFeKehMe4JkYJBY42IhN%2BvreGpHexMVF2kGnqKVLoBCSfaT6Y%2B2Cw%2BQ%2FX3%2F7iXkHqEW%2BXkubSLl0SuEbScAwBZ%2FQykCGIxB5tH%2FjTbr1NFvzDgBWJJp9JuD2gRV28BgYMWLPWFDxufmMjxYQYKsv5d5CdYXBmmy5BHrD9%2FoTPyDUvrBNKoqIsW92ikT3TFfussHlkaKwyhU5taQ8AjF9pizAMcaBTXS0MWQ%2FP6kRVxfXjiFIpsIzPL7Bb7I5zxeA%3D%3D'],
                    comment: '這份工作比想像中還要累，但收穫也很多。',
                    createAt: new Date('2023-04-17T09:00:00'),
                },
            ],
        },
        {
            userId: userCase4._id,
            status: 'completed',
            title: '陪我練習開車',
            category: '其他內容',
            description: '我最近剛考到駕照，但還不太有經驗，需要一位有開車經驗的人來陪我練習開車，希望能有耐心且細心的教練。',
            salary: 567,
            exposurePlan: '限時曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/7df19da5-cbcf-4b71-8a5e-62a318a864da.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=hl2TIsZQMu5IXz4SMH9o7PIYkZ2xbcrgrh7iBH6sm2L7B%2Fj4G3MT97IUD30GAEqM8XzgWupO9j8y%2BHP6Mr0NQ0Sw1HpWRIrjKDlAz%2FVlHiYGlMM1WOjzphKga2STrGWGBEPF1c8Hlh3bkjt%2BQ%2BP%2BOFUGw%2B2zamJYRbB1Qc0XAA4AygCvgvCUWTruQCf6sErjCjOK3q21a8z8NnR6BZes6h%2BDtZ8xQt63B1rJ%2BgNCMaiLtqOLHTnYmZBhA4KJaiWUt%2Bad9qZ6QXlP%2F4%2BD6N9eTj9t5QDBim4LkcX9%2BBKT7m%2BxMQme2MPNElDXvkj3Gh7pMOiaLXikFh1WckpKy%2BT6vg%3D%3D'],
            contactInfo: {
                name: `${userCase4.lastName}${userCase4.firstName}`,
                phone: userCase4.phone,
                email: userCase4.email,
            },
            location: {
                city: '台中市',
                dist: '南區',
                address: '台中市南區復興南路二段240號',
                longitude: 120.6624117,
                latitude: 24.1208445,
            },
            isUrgent: false,
            currentHelperId: userCase1._id,
            helpers: [
                {
                    helperId: userCase1._id,
                    status: 'paired',
                },
                {
                    helperId: userCase2._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase5._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase3._id,
                    status: 'unpaired',
                },
            ],
            time: {
                createdAt: new Date('2023-05-02T18:00:00'),
                updatedAt: new Date('2023-05-17T09:00:00'),
                publishedAt: new Date('2023-05-02T20:00:00'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2023-05-13T09:00:00'),
                submittedAt: new Date('2023-05-17T09:00:00'),
                confirmedAt: new Date('2023-05-18T09:00:00'),
                completedAt: new Date('2023-05-19T09:00:00'),
                expiredAt: new Date('2023-06-02T18:00:00'),
            },
            submittedInfo: [
                {
                    role: '幫手',
                    imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/7df19da5-cbcf-4b71-8a5e-62a318a864da.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=hl2TIsZQMu5IXz4SMH9o7PIYkZ2xbcrgrh7iBH6sm2L7B%2Fj4G3MT97IUD30GAEqM8XzgWupO9j8y%2BHP6Mr0NQ0Sw1HpWRIrjKDlAz%2FVlHiYGlMM1WOjzphKga2STrGWGBEPF1c8Hlh3bkjt%2BQ%2BP%2BOFUGw%2B2zamJYRbB1Qc0XAA4AygCvgvCUWTruQCf6sErjCjOK3q21a8z8NnR6BZes6h%2BDtZ8xQt63B1rJ%2BgNCMaiLtqOLHTnYmZBhA4KJaiWUt%2Bad9qZ6QXlP%2F4%2BD6N9eTj9t5QDBim4LkcX9%2BBKT7m%2BxMQme2MPNElDXvkj3Gh7pMOiaLXikFh1WckpKy%2BT6vg%3D%3D'],
                    comment: '學生學得很快，很有耐心。',
                    createAt: new Date('2023-04-17T09:00:00'),
                },
            ],
        },
        {
            userId: userCase5._id,
            status: 'completed',
            title: 'Notion 教學',
            category: '電腦教學',
            description: '需要一位有經驗的人來教我如何使用 Notion 管理自己的筆記和待辦事項。',
            salary: 999,
            exposurePlan: '限時黃金曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/938c5135-1286-4c3b-b6b5-a2d7d134602f.png?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=oYMU6KiwmNT68yWvTmdHWSIJTilHbjwWODqYbUZ1CagffUJfdX7S6JWfMAyqLGFccWxeOuvs8mM0SIqtkvPV%2Bi3gkY55XE%2FNi%2BElLEqrLZda8R0ngu6SElP9SFyD%2BLTcfH6Y7y%2Bayza2HaBoxINntEa94d40cDw5fDYFkumTWafqDGmXjiWGQHmaPZK0v2t0qKGKPB%2By6ZJUOJ0DMwlyVECVgV0u4Lcr9r609tSkzmbNyc4jSEhfaE1eUUo4L1HE4CNCEBFycCPMy7gpIDF7HRS04TL0foIt%2BLqv9nM8dy1y7CaXrbkTeWv%2B6vHa3QrRH0haqRx%2Ffo5CIJJ%2Bb2HHgg%3D%3D'],
            contactInfo: {
                name: `${userCase5.lastName}${userCase5.firstName}`,
                phone: userCase5.phone,
                email: userCase5.email,
            },
            location: {
                city: '臺北市',
                dist: '中正區',
                address: '臺北市中正區信義路1號',
                longitude: 121.5748662,
                latitude: 25.0219844,
            },
            isUrgent: false,
            currentHelperId: userCase2._id,
            helpers: [
                {
                    helperId: userCase2._id,
                    status: 'paired',
                },
                {
                    helperId: userCase1._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase2._id,
                    status: 'unpaired',
                },
                {
                    helperId: userCase3._id,
                    status: 'unpaired',
                },
            ],
            time: {
                createdAt: new Date('2023-05-03T18:00:00'),
                updatedAt: new Date('2023-06-01T10:00:00'),
                publishedAt: new Date('2023-05-02T20:00:00'),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: new Date('2023-05-27T09:00:00'),
                submittedAt: new Date('2023-05-29T05:00:00'),
                confirmedAt: new Date('2023-06-01T09:00:00'),
                completedAt: new Date('2023-06-01T10:00:00'),
                expiredAt: new Date('2023-06-03T18:00:00'),
            },
            submittedInfo: [
                {
                    role: '幫手',
                    imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/938c5135-1286-4c3b-b6b5-a2d7d134602f.png?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=oYMU6KiwmNT68yWvTmdHWSIJTilHbjwWODqYbUZ1CagffUJfdX7S6JWfMAyqLGFccWxeOuvs8mM0SIqtkvPV%2Bi3gkY55XE%2FNi%2BElLEqrLZda8R0ngu6SElP9SFyD%2BLTcfH6Y7y%2Bayza2HaBoxINntEa94d40cDw5fDYFkumTWafqDGmXjiWGQHmaPZK0v2t0qKGKPB%2By6ZJUOJ0DMwlyVECVgV0u4Lcr9r609tSkzmbNyc4jSEhfaE1eUUo4L1HE4CNCEBFycCPMy7gpIDF7HRS04TL0foIt%2BLqv9nM8dy1y7CaXrbkTeWv%2B6vHa3QrRH0haqRx%2Ffo5CIJJ%2Bb2HHgg%3D%3D'],
                    comment: '',
                    createAt: new Date('2023-04-17T09:00:00'),
                },
            ],
        },
        {
            userId: userCase2._id,
            status: 'published',
            title: '兼職家教數學',
            category: '家教陪讀',
            description: '需要幫忙教授數學科目，學生理解能力稍弱，時薪400，急需人手。',
            salary: 400,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/0ad3b90d-4958-4690-b89f-574833ffb673.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=i99vcoya6YvanXzSjEf3lR74T7%2Bd1GbSUr2IY9aD1uGMBD6RyyVH%2BVdAtbgoA56fOMeYmk%2BidqWyIBBbeSKG3jvXqAibofRGysqWV7CYXWRa%2Bc7qT02wu%2FgRcJX5UBjxLLu2a%2BszXluH1Rdpg1NPlN3h6HihZLp0IEW%2FHUDoZ5hsN9rtheBs4ZPPe%2Faf12iev%2B6CHtVdRiv67olWITj8lkd52pKlE43PQJA7IozApIujLZwvNDdiXqYhCZplGLEtOSdERfYGnxHga%2F0dyplzGi7slJYK57oXynO8V%2BW185I11JKNSMq%2FfNSVBoxEUVW8PT0VeW5MOlrOy0fWTSrAVQ%3D%3D'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '中山區',
                address: '忠孝東路二段100號',
                longitude: 121.5304479,
                latitude: 25.042823,
            },
            isUrgent: false,
            helpers: [
                {
                    helperId: userCase5._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase4._id,
                    status: 'waiting',
                },
            ],
            time: {
                createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                publishedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date(new Date().setDate(new Date().getDate() + 29)),
            },
        },
        {
            userId: userCase1._id,
            status: 'published',
            title: '需求短期家庭清潔工',
            category: '居家服務',
            description: '家中需要進行全面清潔，時薪350，需求立即開始。',
            salary: 350,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/e68a9ee4-ce28-4dda-ac45-f7463113063e.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=Pr5wfciWCDqtwSKl05xMIgBsM%2FKgEkkeGCdmp%2BinNG%2BeWFHDZOL0d5tPxZYW1Y8hdiFBu83Q6cpMQ1M9xNCAeW%2BFeKehMe4JkYJBY42IhN%2BvreGpHexMVF2kGnqKVLoBCSfaT6Y%2B2Cw%2BQ%2FX3%2F7iXkHqEW%2BXkubSLl0SuEbScAwBZ%2FQykCGIxB5tH%2FjTbr1NFvzDgBWJJp9JuD2gRV28BgYMWLPWFDxufmMjxYQYKsv5d5CdYXBmmy5BHrD9%2FoTPyDUvrBNKoqIsW92ikT3TFfussHlkaKwyhU5taQ8AjF9pizAMcaBTXS0MWQ%2FP6kRVxfXjiFIpsIzPL7Bb7I5zxeA%3D%3D'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '大安區',
                address: '忠孝東路三段200號',
                longitude: 121.5395262,
                latitude: 25.0414373,
            },
            isUrgent: false,
            helpers: [
                {
                    helperId: userCase5._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase3._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase2._id,
                    status: 'waiting',
                },
            ],
            time: {
                createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                publishedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date(new Date().setDate(new Date().getDate() + 29)),
            },
        },
        {
            userId: userCase1._id,
            status: 'published',
            title: '需要網頁設計師',
            category: '網頁設計',
            description: '尋找有經驗的網頁設計師合作專案，時薪600，須具備UI/UX設計能力。',
            salary: 600,
            exposurePlan: '黃金曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/a9a6d67c-2a24-41d3-96df-abb825fc8b42.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=o42VPk226KLvF%2FwU3b4meMi%2BcNz7SWalhLovKDRvdFYh5Uoj%2BX%2FW55jrkUKFGCgzPRicOYXctUHjB9BmE0As5dSRoHtvzhpp1aHAt4r%2BDlVfgEUsoaliQUf9urGJSbohAJdzqqDIN%2BkxROZDrR8vstNO19IBaYd7%2BRRS8OC%2BWCSI6ol07MATgX4XKQz3QTYDb1UhgfCzqHDGmTjMeFtOy2p8iW%2FDhZUrLXhbDmzCQW6twfHUrRR0ui5%2Fl%2BAtJS8ICIDo7EqPfn54fwTSl%2BiKzRusjzxLg5mS9kp4TVo2HieyHYPa3VwZhkp1TGqbhq2l5HRaklCsROHMEi%2Bplb3y2g%3D%3D'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '內湖區',
                address: '瑞光路581號',
                longitude: 121.5681287,
                latitude: 25.0799209,
            },
            isUrgent: false,
            helpers: [
                {
                    helperId: userCase5._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase4._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase3._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase2._id,
                    status: 'waiting',
                },
            ],
            time: {
                createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
                updatedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
                publishedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date(new Date().setDate(new Date().getDate() + 25)),
            },
        },
        {
            userId: userCase1._id,
            status: 'published',
            title: '需求運動教練',
            category: '運動陪練',
            description: '尋找有經驗的運動教練進行團體訓練，時薪450，場地提供。',
            salary: 450,
            exposurePlan: '限時黃金曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/e1e193f1-4e06-4e33-af9a-2bf582c55b14.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=EB5m3spRNsetk7WF0Nd170eUp%2FAfqYlG4w0PWRiW99L%2FAkfm%2BuDJHxda8qTbuSryF6%2FJ0acZZOccB3kPi1NEkKjJOMCrxJMoMez%2ByPsnMb2pe74wA3Upucu2SOkmdyZnHOCgorn3v2RytpyzPKB3YZ0slDFPCA7XhfIpNUsLtT6gJkfPcXfHUiUm2Z3K%2FZPv5ciVjx5wW8JHZN1kEsThBDcjZbmOkrvejFpl2oiBO8XmcYA3bwZIBM61RZ7%2FaZN8wfvqITeeQswBO7uDpBj21ko4%2FlyunIdvdHwru%2B7o0wVAQk%2BSmy9Ws72kiinjK8rh46IfuBc%2FzF0jPsXTQOBKNg%3D%3D'],
            contactInfo: {
                name: `${userCase1.lastName}${userCase1.firstName}`,
                phone: userCase1.phone,
                email: userCase1.email,
            },
            location: {
                city: '臺北市',
                dist: '大安區',
                address: '光復南路300號',
                longitude: 121.5574241,
                latitude: 25.0391323,
            },
            isUrgent: true,
            helpers: [
                {
                    helperId: userCase4._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase3._id,
                    status: 'waiting',
                },
                {
                    helperId: userCase2._id,
                    status: 'waiting',
                },
            ],
            time: {
                createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
                updatedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
                publishedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date(new Date().setDate(new Date().getDate() + 27)),
            },
        },
        {
            userId: userCase3._id,
            status: 'published',
            title: '需要翻譯人員',
            category: '文書處理',
            description: '招募翻譯人員協助會議翻譯，時薪1550，需要擅長英文和中文。',
            salary: 1550,
            exposurePlan: '限時曝光',
            imgUrls: ['https://storage.googleapis.com/superhandy.appspot.com/images/5491cce3-28a3-41df-b74e-c223a22ddc34.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=jt25T2H3muNzDgpsGeA1ssVJHXo7ptkp429aXA7qUCB6m80%2Fw94xFUHn8smB5zE2XoUsz%2Fi%2FdxA%2BFww%2BKavaAIxq2MksDLazpggrkQRsmksXu8FaiyCfsUEqTEe0qFD2bdrvpeOW15CaKcpXzUxrUIT4q4TcNtqj5O5klYIacWGsJNcwJbNhNqWFsMI4VBYLahXSXdK9pPCMfHajqppC6BDFJx7oN8omFdiknx5OMijKbF7kw4qEbyyFge25PT%2FhifgnMGWSHuGkNbuMIJ%2F3Q3Ajmj%2FJjaUMuS9i5jhb8cXyAd0VJaLHLfrN9cKHoVgKjAa2vvp5xV6j%2FdNrH0dL5g%3D%3D'],
            contactInfo: {
                name: `${userCase3.lastName}${userCase3.firstName}`,
                phone: userCase3.phone,
                email: userCase3.email,
            },
            location: {
                city: '臺北市',
                dist: '大安區',
                address: '忠孝東路四段216巷38號',
                longitude: 121.5528545,
                latitude: 25.0395291,
            },
            isUrgent: true,
            helpers: [
                {
                    helperId: userCase2._id,
                    status: 'waiting',
                },
            ],
            time: {
                createdAt: new Date(),
                updatedAt: new Date(),
                publishedAt: new Date(),
                unpublishedAt: null,
                deletedAt: null,
                inProgressAt: null,
                submittedAt: null,
                confirmedAt: null,
                completedAt: null,
                expiredAt: new Date(new Date().setDate(new Date().getDate() + 7)),
            },
        },
    ];

    try {
        // 刪除現有的所有類別
        await Task.deleteMany({});

        // 插入新的類別
        await Task.insertMany(tasks);

        console.log('任務資料初始化成功');
    } catch (err) {
        console.error('任務資料初始化失敗', err);
    }
};

module.exports = initTasks;
