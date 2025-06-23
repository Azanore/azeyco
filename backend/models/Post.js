const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["image"],
    default: "image",
  },
  filename: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorUsername: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 280,
      trim: true,
    },
    media: {
      type: [mediaSchema],
      default: [],
      validate: {
        validator: function (media) {
          return media.length <= 10;
        },
        message: "Maximum 10 media files allowed per post",
      },
    },
    type: {
      type: String,
      enum: ["text", "image", "mixed"],
      default: "text",
    },
    hashtags: {
      type: [String],
      default: [],
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    visibility: {
      type: String,
      enum: ["public", "followers", "private"],
      default: "public",
    },
    isReported: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to extract hashtags and set post type
postSchema.pre("save", function (next) {
  // Extract hashtags from content
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
  this.hashtags = this.content.match(hashtagRegex) || [];

  // Determine post type
  if (this.media && this.media.length > 0) {
    this.type = this.content.trim() ? "mixed" : "image";
  } else {
    this.type = "text";
  }

  next();
});

// Index for better query performance
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ authorUsername: 1 });
postSchema.index({ hashtags: 1 });
postSchema.index({ isActive: 1, visibility: 1, createdAt: -1 });

module.exports = mongoose.model("Post", postSchema);
