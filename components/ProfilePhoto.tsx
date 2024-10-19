interface IPrpos {

};

const ProfilePhoto =({}:IPrpos)=>{
      return(
            <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted">
              {profilePhoto ? (
                <Image
                  src={URL.createObjectURL(profilePhoto)}
                  alt="Profile photo"
                  layout="fill"
                  style={{objectFit:"cover"}}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Upload className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <Label htmlFor="profilePhoto" className="cursor-pointer text-sm text-primary hover:underline">
              Upload Profile Photo
            </Label>
            <Input
              id="profilePhoto"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePhotoChange}
            />
          </div>
      )
}

export default ProfilePhoto