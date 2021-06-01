-- LocalScript

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UpdateSong = ReplicatedStorage.RadioServer.UpdateSong

local Sound = Instance.new("Sound", game.Workspace)
--local Thumbnail = game.Workspace.Part.RadioUI.Thumbnail
--local SoundName = game.Workspace.Part.RadioUI.SoundName

UpdateSong.OnClientEvent:Connect(function(Data)
	Sound:Stop()
	
        Sound.SoundId = Data.SoundId
        Sound.TimePosition = Data.TimePosition
	--SoundName.Text = Data.SoundName
	--Thumbnail.Image = Data.Thumbnail
	
	Sound:Play()
end)
