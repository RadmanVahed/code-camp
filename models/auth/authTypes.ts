export interface registerType {
    username:string,
    email:string,
    password:string,
    phone:string,
    city:string,
    gender:string
}
export interface loginType {
    email:string,
    password:string
}
export interface authorizationType {
    token:string,
    role:string
}