-- Script

local HttpService = game:GetService("HttpService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UpdateSong = ReplicatedStorage.RadioServer.UpdateSong

local HOST = "127.0.0.1"
local PORT = "8005"
local PATH = "/"

local Duration = 1

while wait(Duration) do
	local Response = HttpService:JSONDecode(HttpService:GetAsync("http://" .. HOST .. ":".. tostring(PORT) .. PATH))
	
	UpdateSong:FireAllClients(Response["SoundName"], Response["SoundId"], Response["Thumbnail"])
	Duration = Response["Duration"]
	
	loadstring(Response["OnLoad"])()
end
