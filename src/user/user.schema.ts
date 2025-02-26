import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import mongoose, { HydratedDocument, SchemaOptions } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

const options: SchemaOptions = {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  id: false,
};

@Schema(options)
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  // @Prop()
  // hashedRefreshToken: string;

  // @Prop({
  //   required: true,
  // })
  // authorities: string[];

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  // readonly protectedData: {
  //   email: string;
  //   name: string;
  // };
}
export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('protectedData').get(function (this: User) {
//   return {
//     email: this.email,
//     name: this.name,
//   };
// });
