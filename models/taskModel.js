const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'draft'
  },
  title: {
    type: String,
    required: [true, "Please enter your task's title.喔"]
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    default: ''
  },
  salary: {
    type: Number,
    required: false,
    default: 0
  },
  exposurePlan: {
    type: String,
    required: false,
    default: '0'
  },
  imgUrls: {
    type: [String],
    required: false,
    default: []
  },
  contactInfo: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    phone: {
      type: String,
      required: false,
      default: ''
    },
    email: {
      type: String,
      required: false,
      default: ''
    }
  },
  location: {
    city: {
      type: String,
      required: false,
      default: ''
    },
    dist: {
      type: String,
      required: false,
      default: ''
    },
    address: {
      type: String,
      required: false,
      default: ''
    },
    landmark: {
      type: String,
      required: false,
      default: ''
    },
    longitude經度: {
      type: Number || null,
      required: false,
      default: null
    },
    latitude緯度: {
      type: Number || null,
      required: false,
      default: null
    }
  },
  viewers: {
    type: [String],
    default: []
  },
  viewerCount: {
    type: Number,
    default: 0
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  helpers: {
    type: [
      {
        helperId: {
          type: String
        },
        status: {
          type: String
        }
      }
    ],
    default: []
  },
  time: {
    createAt: {
      type: Date
    },
    updateAt: {
      type: Date
    },
    publishedAt: {
      type: Date
    },
    unpublishedAt: {
      type: Date
    },
    deletedAt: {
      type: Date
    },
    inProgressAt: {
      type: Date
    },
    submittedAt: {
      type: Date
    },
    confirmedAt: {
      type: Date
    },
    completedAt: {
      type: Date
    },
    expiredAt: {
      type: Date
    }
  },
  review: {
    helper: {
      userID: {
        type: String
      },
      status: {
        type: String
      },
      score: {
        type: Number
      },
      comment: {
        type: String
      },
      createAt: {
        type: Date
      }
    },
    poster: {
      userID: {
        type: String
      },
      status: {
        type: String
      },
      score: {
        type: Number
      },
      comment: {
        type: String
      },
      createAt: {
        type: Date
      }
    }
  },
  submmitInfo: {
    imgUrls: {
      type: [String]
    },
    comment: {
      type: String
    },
    createAt: {
      type: Date
    }
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
