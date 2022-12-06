local opened = false
local Promise = nil


function openMenu(options, cb1, cb2)
    if not options then return end
    opened = true
    Promise = promise.new()
    SetNuiFocus(true, false)
    SendNUIMessage({
        type = 'open',
        info = options
    })
    local awaitPromise = Citizen.Await(Promise)
    if awaitPromise ~= 'closed' then
        cb(awaitPromise)
    else
        zb("")
    end
end

RegisterNUICallback("enter", function(data)

    opened = false
    Promise:resolve(data.value)
    Promise = nil
    SetNuiFocus(false, false)
end)


RegisterNUICallback('close', function()
    Promise:resolve('closed')
    Promise = nil
    SetNuiFocus(false, false)
    opened = false
end)

exports("openMenu", openMenu)



RegisterCommand("menudeneme", function()
    local options = {
        title = "Deneme",
        options = {
            {value = "wow", title="Option 1", icon='fa-solid fa-person-rays'},
            {value = "ne", title="Option 2", icon="fa-solid fa-marker"},
            {value = "ne", title="Option 2"},
            {value = "ne", title="Option 2"},
            {value = "ne", title="Option 2"},
            {value = "ne", title="Option 2"},
            {value = "ne", title="Option 2"},

        }

    }
    exports['poyMenu']:openMenu(options, function(data)
        print(data) 

    end, 
    function() 
        print("closed") 
    
    end)
end)