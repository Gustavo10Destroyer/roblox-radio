local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UpdateSong = ReplicatedStorage.RadioServer.UpdateSong

local Sound = Instance.new("Sound", game.Workspace)
--local Thumbnail = game.Workspace.Part.RadioUI.Thumbnail
--local SoundName = game.Workspace.Part.RadioUI.SoundName

UpdateSong.OnClientEvent:Connect(function(Name, ID, Thumb)
	Sound:Stop()
	
	Sound.SoundId = ID
	--SoundName.Text = Name
	--Thumbnail.Image = Thumb
	
	Sound:Play()
end)
