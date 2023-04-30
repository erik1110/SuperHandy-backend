const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: ''
  },
  status: {
    type: String,
    required: true,
    default: 'published'
  },
  title: {
    type: String,
    required: true,
    default: ''
  },
  category: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    required: true,
    default: ''
  },
  salary: {
    type: Number,
    required: true,
    default: 500
  },
  exposurePlan: {
    type: String,
    required: true,
    default: '2'
  },
  imgUrls: {
    type: [String],
    required: true,
    default: []
  },
  contactInfo: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    phone: {
      type: String,
      required: true,
      default: ''
    },
    email: {
      type: String,
      required: true,
      default: ''
    }
  },
  location: {
    city: {
      type: String,
      required: true,
      default: ''
    },
    dist: {
      type: String,
      required: true,
      default: ''
    },
    address: {
      type: String,
      required: true,
      default: ''
    },
    landmark: {
      type: String,
      required: true,
      default: ''
    },
    longitude經度: {
      type: Number,
      required: true,
      default: 0
    },
    latitude緯度: {
      type: Number,
      required: true,
      default: 0
    }
  },
  viewers: {
    type: [String],
    required: true,
    default: []
  },
  viewerCount: {
    type: Number,
    required: true,
    default: 0
  },
  isUrgent: {
    type: Boolean,
    required: true,
    default: true
  },
  helpers: {
    type: [
      {
        helperId: {
          type: String,
          required: true,
          default: ''
        },
        status: {
          type: String,
          required: true,
          default: ''
        }
      }
    ],
    required: true,
    default: []
  },
  time: {
    createAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    updateAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    publishedAt: {
      type: Date || null,
      required: true,
      default: Date.now
    },
    unpublishedAt: {
      type: Date || null,
      required: true,
      default: Date.now
    },
    deletedAt: {
      type: Date || null,
      required: true,
      default: Date.now
    },
    inProgressAt: {
      type: Date || null,
      required: true,
      default: Date.now
    },
    submittedAt: {
      type: Date || null,
      required: true,
      default: Date.now
    },
    confirmedAt: {
      type: Date || null,
      required: true,
      default: Date.now
    },
    completedAt: {
      type: Date || null,
      required: true,
      default: Date.now
    },
    expiredAt: {
      type: Date || null,
      required: true,
      default: Date.now
    }
  },
  review: {
    helper: {
      userID: {
        type: String,
        required: true,
        default: ''
      },
      status: {
        type: String,
        required: true,
        default: ''
      },
      score: {
        type: Number,
        required: true,
        default: 0
      },
      comment: {
        type: String,
        required: true,
        default: ''
      },
      createAt: {
        type: Date,
        required: true,
        default: Date.now
      }
    },
    poster: {
      userID: {
        type: String,
        required: true,
        default: ''
      },
      status: {
        type: String,
        required: true,
        default: ''
      },
      score: {
        type: Number,
        required: true,
        default: 0
      },
      comment: {
        type: String,
        required: true,
        default: ''
      },
      createAt: {
        type: Date,
        required: true,
        default: Date.now
      }
    }
  },
  submmitInfo: {
    imgUrls: {
      type: [String],
      required: true,
      default: []
    },
    comment: {
      type: String,
      required: true,
      default: ''
    },
    createAt: {
      type: Date,
      required: true,
      default: Date.now
    }
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
