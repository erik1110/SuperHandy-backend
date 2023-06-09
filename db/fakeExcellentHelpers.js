const fakeExcellentHelperData = [
    {
        lastName: '翁',
        avatar: 'https://storage.googleapis.com/superhandy.appspot.com/images/28613b4d-61b5-4b7c-9706-aac181adf707.jpg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=NujvEfpN%2Ftd7SUtE6nFx%2B5lntpR4W3UBdvjpzLMwTNujtqb9DujOyMI11KPdulHOmD%2BAiDGtDyfr2%2FMXo17xFo3zCF5Moe1o5P2y%2FsktBqK%2FhWCZoHLVN1LmOW8UlKv7Ioa6%2Bqq9Wa%2FSFkxrQy24D4KcA7wEqUyc2AllPOn%2B%2B3Mn6MGN80SleJN2r%2BEiV2zNs7UsfnGsbCO7FPmj3to%2F6jkxGGpAvfcJenBPmdFvsqvR2d3U%2FtauvCJjZwyN6yq9e%2FCpYd918lFbTw186udFEs5t01A1nWeTrB5NEZZjuFzOEe5DhlZk3Z5Pe3N%2BFGyMbi1Cy0XI%2F%2BmTx75yvZp9pA%3D%3D',
        completedTasks: 108,
        completionRate: 90,
        rating: {
            overall: 4.8,
            categories: [
                {
                    name: '活動支援',
                    star: 4.9,
                    totalReviews: 13,
                },
                {
                    name: '家教陪讀',
                    star: 4.7,
                    totalReviews: 21,
                },
                {
                    name: '排隊代購',
                    star: 4.5,
                    totalReviews: 12,
                },
            ],
        },
    },
    {
        lastName: '李',
        avatar: 'https://storage.googleapis.com/superhandy.appspot.com/images/88deabe1-b0a4-4a34-be0e-4476139ead50.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=nYQYBvEs799H46gZgLANSRuAOcGsc%2Fd57wr5uFKz7%2Bhk5V5xULhwH0AcsH3JYbnyR%2FSMhLjIpzkrLXuD%2F2x42f8zIUHRkMMMekjvgkDMsOUyA0hBMaFfpqQUkBdvyd3QazwXegGxboWGZARdr7oeFb9eTcu1emIxuIwPdv7hcIAESDimnPolEz5%2BSdmQdFDSI0o0UW4LP7u0KcauDjhubAAcI16ggOi%2FvBMmQh%2B%2BeOG80nEFxmMyc2gNTgzcRkUOzwYl4kYLslD%2FhV1Tm7HS0ta6yy9Z3xQsFV%2F38GtsLhWdIKFGUIqWdrVTqsR5CUfebtTaS390g7822enARtuv6w%3D%3D',
        completedTasks: 18,
        completionRate: 80,
        rating: {
            overall: 4.6,
            categories: [
                {
                    name: '到府驅蟲',
                    star: 4.9,
                    totalReviews: 50,
                },
                {
                    name: '寵物陪伴',
                    star: 4.7,
                    totalReviews: 25,
                },
                {
                    name: '排隊代購',
                    star: 4.5,
                    totalReviews: 12,
                },
            ],
        },
    },
    {
        lastName: '都',
        avatar: 'https://storage.googleapis.com/superhandy.appspot.com/images/e78929a7-c8e1-4bf8-a159-fabc0150a6cb.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=LXG84tZ0Wy2KZ6NtbeMu%2FPeF0fmANXzmhZEhob6cYfXLzBIzXiMvBYVc6N7GMZeSPandS7HAFRibEH1Q55TnaSuK7htvuvSJ2sgrV7NyUZCtRlJHP5OLe5yUVf8JsNseNnpbEgfjclUzwUwiDEaFkRvQ%2B5cLUAQF9Z4gwqAXdbynRIXuFYtbRj%2BJ1O8Lzrmu46WjdEFHDKybDdzhbr3gi49gHyYAS2T6P0LCIOhQZGq%2B0sKKAypoL8h1lMK0acuGhpucYC1BSDcC5S1G8QYWfy%2FK5isYeFkG7y3Ij4AY3Gj%2B5yeFuo%2FAvs7eiNIt1XrRHSJKOFPSfynFNW72nYMI3w%3D%3D',
        completedTasks: 96,
        completionRate: 89,
        rating: {
            overall: 4.7,
            categories: [
                {
                    name: '排隊代購',
                    star: 4.5,
                    totalReviews: 102,
                },
                {
                    name: '市場調查',
                    star: 4.7,
                    totalReviews: 29,
                },
                {
                    name: '人力派遣',
                    star: 4.9,
                    totalReviews: 19,
                },
            ],
        },
    },
    {
        lastName: '陳',
        avatar: 'https://storage.googleapis.com/superhandy.appspot.com/images/22a3d07b-0f4d-49e6-a10a-4ecc89bb41bd.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=msVmyLKR2AS0EiwiP0V7%2BRKAJZp9cP8B8Z0eY3ZCLIJPvb0Puebcq5A2rEyKQui3kWAvWORVAZE1W3natoJxsl1GVkktwhdiBxJLyV1CbPzZt6XKywKhn6qjmExUz3d8CRs9wexTQbPlQL628Osd2xNz2dIyTAu6EPmM5CEF8cCs0Ng4SgoLnKyatZmXYauWj7kiZrHIc3qrCxbAtsw1wcsAUwjrPUJUVuEv%2BCgX9c%2B16ReOz5iKxtT8sdQENB2tNyuDpzKkWp7o6S%2F2G7Z4bO0%2BD%2BZ%2B%2BAphNj%2BElEdj1v%2FKqLa53secKv%2BuXcIBX0chWOZCm05N6uc0z5dNuLOgnw%3D%3D',
        completedTasks: 203,
        completionRate: 85,
        rating: {
            overall: 4.7,
            categories: [
                {
                    name: '銷售產品',
                    star: 4.9,
                    totalReviews: 66,
                },
                {
                    name: '人力派遣',
                    star: 4.3,
                    totalReviews: 21,
                },
                {
                    name: '家教陪讀',
                    star: 4.1,
                    totalReviews: 56,
                },
            ],
        },
    },
    {
        lastName: '何',
        avatar: 'https://storage.googleapis.com/superhandy.appspot.com/images/462e9834-4a26-4841-815e-22c1ada96559.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=eOy4SRQ9yXsroLNtRXSYxU6vMxXYkCemp6TBO5F%2B4%2BcTbN7zH0Dy%2BB4D3mZqow8gJg%2FDy8tc2DVU6tecJaANReIKF5gaphDeUv01BKP40bByX1wcuIerz%2FRoaIbkeTONJlsfhN5zGOVcrldmD%2F%2BgRlOOj2o9qTnGH7I3OrMCTYbBKyxJVggkuapTYhwbgvNl70FbIITfc5GebRr%2FXuxsZpLhBXM64dLKAXeRVyFIHrV1fgNwjCRdkQ%2BuNLPMGzjIq0ms8vj%2Fz8q6XLueANfmVbDOgSij2cUvjzQkUJpI%2BWfH0L9XRiUSIoDkPuLAZFuraCasfOdEXfoKsryfEQNKgQ%3D%3D',
        completedTasks: 199,
        completionRate: 97,
        rating: {
            overall: 4.9,
            categories: [
                {
                    name: '家教陪讀',
                    star: 4.9,
                    totalReviews: 90,
                },
                {
                    name: '寫評分享',
                    star: 5,
                    totalReviews: 12,
                },
                {
                    name: '電腦教學',
                    star: 4.9,
                    totalReviews: 66,
                },
            ],
        },
    },
    {
        lastName: '鄭',
        avatar: 'https://storage.googleapis.com/superhandy.appspot.com/images/431b34a0-b4f0-444c-885e-1ec199ba0888.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=YuQqn79ptErLX4UI5pvXhfOmKkttNilYEtWJtqc1KiRVT3A9gPLWhJ7w7NNz%2BZxsLZFTQscrKJAAhYs2FCQqY85pBrUlqpZl0Y574fNci718G39N7EiaVdFcIwwUYZmwbrqhBPq1Tf7JWwMETO8FISPd8%2BBgOBwJYhOElZjX0MyXZQxh1M9gR%2Bb3eOF70FwHQlF3iY2hRl5glb55hJ0khpeMF9E6nZDb5J1NfC%2BimFNvdhydTdmzD1LkXYgbiorlo8RFhQ3L1QCNlqumaBOgjsLTe6964ocT6BSrLy77clgiSyas%2B7ONKmB%2FkhrgvM1Dg2JcfeL8Qbs%2BSJtZkFPyXQ%3D%3D',
        completedTasks: 390,
        completionRate: 83,
        rating: {
            overall: 4.1,
            categories: [
                {
                    name: '清潔外包',
                    star: 4.3,
                    totalReviews: 49,
                },
                {
                    name: '文書處理',
                    star: 4.5,
                    totalReviews: 164,
                },
                {
                    name: '運動陪練',
                    star: 3.9,
                    totalReviews: 57,
                },
            ],
        },
    },
    {
        lastName: '楊',
        avatar: 'https://storage.googleapis.com/superhandy.appspot.com/images/88deabe1-b0a4-4a34-be0e-4476139ead50.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=nYQYBvEs799H46gZgLANSRuAOcGsc%2Fd57wr5uFKz7%2Bhk5V5xULhwH0AcsH3JYbnyR%2FSMhLjIpzkrLXuD%2F2x42f8zIUHRkMMMekjvgkDMsOUyA0hBMaFfpqQUkBdvyd3QazwXegGxboWGZARdr7oeFb9eTcu1emIxuIwPdv7hcIAESDimnPolEz5%2BSdmQdFDSI0o0UW4LP7u0KcauDjhubAAcI16ggOi%2FvBMmQh%2B%2BeOG80nEFxmMyc2gNTgzcRkUOzwYl4kYLslD%2FhV1Tm7HS0ta6yy9Z3xQsFV%2F38GtsLhWdIKFGUIqWdrVTqsR5CUfebtTaS390g7822enARtuv6w%3D%3D',
        completedTasks: 183,
        completionRate: 89,
        rating: {
            overall: 4.4,
            categories: [
                {
                    name: '居家服務',
                    star: 4.5,
                    totalReviews: 14,
                },
                {
                    name: '寵物陪伴',
                    star: 4.0,
                    totalReviews: 21,
                },
                {
                    name: '其他內容',
                    star: 4.9,
                    totalReviews: 34,
                },
            ],
        },
    },
    {
        lastName: '張',
        avatar: 'https://storage.googleapis.com/superhandy.appspot.com/images/a0645e56-60cc-4b0b-9464-69073ac48270.jpeg?GoogleAccessId=firebase-adminsdk-xlymb%40superhandy.iam.gserviceaccount.com&Expires=16756646400&Signature=ndjFGggxcuwu4PInOIyiLb4ZqvX8smo7NQwP%2B2qwCqY8BgN%2BoMxLR9j4zb%2FGYkm2UAR%2F2qryq4IubLpY978htXtx7%2FOnMaH5TDTY6FtefjmR4SIr%2FZpcy0Liv6%2F%2F4vII54LRMRtscAqnuc%2BFGXoxtz%2B%2FL%2FnxkmPOc6Aji9oUbc82B9I4yGrQ4w9Af6Ialuf3NEbAcZnq74JSqQxYAAiAlfbK0lTOq1MQYeFLvev%2FCvlRtUN4eOFoQi7uwthf9lDB7JNUSR8QsulwpflTfZvi%2BaIODHqQSEpVOpnnMo%2B9ljRs0Ol279bkxjxgPwtJagKq55rNyurCNz2pDmCAJ31xoA%3D%3Dg',
        completedTasks: 70,
        completionRate: 80,
        rating: {
            overall: 4.8,
            categories: [
                {
                    name: '銷售產品',
                    star: 4.9,
                    totalReviews: 10,
                },
                {
                    name: '排隊代購',
                    star: 4.7,
                    totalReviews: 24,
                },
                {
                    name: '活動支援',
                    star: 5.0,
                    totalReviews: 12,
                },
            ],
        },
    },
];

module.exports = fakeExcellentHelperData;
