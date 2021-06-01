-- Script

local HttpService = game:GetService("HttpService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UpdateSong = ReplicatedStorage.RadioServer.UpdateSong

local HOST = "953da5ee9340.ngrok.io"
local PORT = "80"
local PATH = "/"

local Duration = 1

while wait(Duration) do
	local Response = HttpService:JSONDecode(HttpService:GetAsync("http://" .. HOST .. ":".. tostring(PORT) .. PATH))

	UpdateSong:FireAllClients(Response)
	Duration = Response["Duration"] - Response["TimePosition"]

	loadstring(Response["OnLoad"])()
end
