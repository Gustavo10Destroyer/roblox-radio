-- LocalScript: RadioClient
-- FullName: game.StarterPlayer.StarterPlayerScripts.RadioClient

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RadioServer = ReplicatedStorage:FindFirstChild("RadioServer")
local UpdateSoundEvent = RadioServer:FindFirstChild("UpdateSound")

local Sound = Instance.new("Sound", game.Workspace)
-- local Player = game.Players.LocalPlayer
-- local GUI = Player.PlayerGui:FindFirstChild("RadioGUI")
-- local Thumbnail = GUI:FindFirstChild("Thumbnail") -- ImageLabel
-- local SoundName = GUI:FindFirstChild("SoundName") -- TextLabel

UpdateSoundEvent.OnClientEvent:Connect(function(Data)
	Sound:Stop()

	Sound.SoundId = Data["SoundId"]
	Sound.TimePosition = Data["TimePosition"]
	--SoundName.Text = Data["SoundName"]
	--Thumbnail.Image = Data["Thumbnail"]

	Sound:Play()
end)
