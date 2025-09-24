import {model, Schema} from 'mongoose';

const courseSchema = new Schema({
    title:{
        type:String,
        required:[true, 'Title is required'],
        minLength:[8, 'Title must be atleast 8 characters'],
        maxLength:[60, 'Title should be less then 60 characters'],
        trim:true, 
    },
    description:{
        type:String,
        required:[true, 'description is required'],
        minLength:[8, 'description must be atleast 8 characters'],
        maxLength:[200, 'description should be less then 200 characters'],
    },
    category:{
        type:String,
        required:[true, 'category is required'],
    },
    thumbnail:{
        public_id:{
            type:String,
        },
        secure_url:{
            type:String,
        }
    },
    lectures:[
        {
            title:String,
            description:String,
            lectureType: { 
                type: String, 
                enum: ['Video', 'PDF', 'YouTube'],
                required: true
            },
            lecture:{
                public_id:{
                    type:String,
                },
                secure_url:{
                    type:String,
                    required:true,
                }
            }
        }
    ],
    numbersOfLectures:{
        type:Number,
        default:0,
    },
    createdBy:{
        type:String,
        required:true,
    }
},{
    timestamps:true
});

const Course = model('Course', courseSchema);

export default Course;