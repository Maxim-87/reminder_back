import {
    IsBoolean,
    IsEnum, IsOptional,
    IsString,
} from "class-validator";
import {$Enums} from "prisma/generated/client";
import Priority = $Enums.Priority;
import {Transform} from "class-transformer";

export class TaskDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsEnum(Priority)
    @IsOptional()
    @Transform(({value}) => ('' + value).toLowerCase())
    priority?: Priority;
}
