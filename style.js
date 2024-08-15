window.onload = () => {

    const data = localStorage.getItem('tesk')
    const arr = data ? JSON.parse(data) : []
    const ul = document.querySelector('.list ul')
    const sele = document.querySelector('.sele')

    //welcome
    const picture = document.querySelector('.imgss')
    setTimeout(function () {
        picture.style.display = 'none'
    }, 5500)

    //添加
    let addInput = document.querySelector('.add input')
    addInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {

            let newText = addInput.value
            let importantInput = document.querySelector('.important').value
            if (newText === '') {
                return alert('输入内容不能为空')
            }
            //声明空对象
            
            const obj = {}
            obj.text = newText
            obj.import = importantInput
            obj.istrue = false
            arr.unshift(obj)
            localStorage.setItem('tesk', JSON.stringify(arr))
            render()
            // 重置表单
            addInput.value = ''
        }
    })


    //删除
    const deletes = document.querySelector('.delete')
    deletes.addEventListener('click', function () {
        if (confirm('您确定要删除这项任务吗？')) {
            const li = document.querySelector('.hehe').parentNode.parentNode.children[2].children[1]
            arr.splice(li.dataset.id, 1)
            localStorage.setItem('tesk', JSON.stringify(arr))
            render()

        }
        sele.classList.remove('active')
        let temp = document.querySelector('.hehe')
        if (temp) {
            document.querySelector('.hehe').classList.remove('hehe')
            temp.src = "./images/sprkai.png"
        }
    })



    // 渲染
    function render() {
        // 遍历数组 arr，有几个对象就生成几个 tr，然后追击给tbody
        // map 返回的是个数组  [tr, tr]
        const trArr = arr.map(function (item, i) {

            let time = item.time ? item.time : "暂未设置时间"
            time = item.istrue ? '您已完成' : time
            const timestyle = item.time == '已超时' ? 'red' : ''
            const chek = item.istrue ? 'checked' : '';
            const line = item.istrue ? 'line' : ''
            const ha = item.istrue ? 'line' : ''
            const im = item.import == '重要' ? '心' : '黑心'
            return `
        <li>
            <input type="checkbox" name="gou" id="" ${chek}>
            <div class="content">
              <div class="text ${line}">${item.text}</div>
              <div class="time ${timestyle}">${time}</div>
            </div>
           <div>
              <img src="./images/${im}.png" alt="">
              <img class="spr" src="./images/sprkai.png" alt="" data-id=${i}>
              
            </div>
          </li>
        `
        })
        // 追加给ul
        // 因为 trArr 是个数组， 我们不要数组，我们要的是 trArr的字符串 join()
        ul.innerHTML = trArr.join('')
        spread()
        checkbox()

    }
    render()


    //展开
    function spread() {
        const spr = document.querySelectorAll('.spr')
        for (let i = 0; i < spr.length; i++) {

            spr[i].addEventListener('click', function (e) {
                if (!sele.classList.contains('active')) {
                    let x = spr[i].getBoundingClientRect().x
                    let y = spr[i].getBoundingClientRect().y

                    sele.classList.add('active')

                    sele.style.top = y + 55 + 'px'
                    sele.style.left = x + (-40) + 'px'
                    spr[i].src = "./images/缩小.png"
                    spr[i].classList.add('hehe')
                } else {
                    let temp = document.querySelector('.hehe')
                    temp.src = "./images/sprkai.png"
                    temp.classList.remove('hehe')
                    sele.classList.remove('active')
                    spr[i].src = "./images/sprkai.png"
                }
            })

        }
    }
    // spread()

    // 隐藏默认的"推迟"
    const select = document.querySelector('.sele select');
    select.options[0].style.display = 'none';


    //推迟时间
    const ok = document.querySelector('.ok')
    const selctTime = document.querySelector('.selctTime')
    ok.addEventListener('click', function () {

        // console.log(li)
        if (selctTime.value) {
            const li = document.querySelector('.hehe').parentNode.parentNode.children[2].children[1]

            const time = document.querySelector('.hehe').parentNode.parentNode.children[1].children[1]
            if ((time.innerHTML == '暂未设置时间' || time.innerHTML == '已超时') && selctTime.value != '明天') {
                const temp = selctTime.value
                let hours = Math.floor(temp / 60) >= 10 ? Math.floor(temp / 60) : '0' + Math.floor(temp / 60)
                let mins = temp % 60 >= 10 ? temp % 60 : '0' + temp % 60
                time.innerHTML = hours + ":" + mins + "小时后"
            } else if (time.innerHTML == '明天') {
                alert('请于明天再修改哦！')
            } else if (selctTime.value == '明天') {
                time.innerHTML = '明天'
            } else {
                let temp = time.innerHTML
                let hours = parseInt(temp.slice(0, 2));
                let minutes = parseInt(temp.slice(3, 5));
                temp = (+hours) * 60 + (+minutes) + (+selctTime.value)
                console.log(+minutes)
                hours = Math.floor(temp / 60) >= 10 ? Math.floor(temp / 60) : '0' + Math.floor(temp / 60)
                mins = temp % 60 >= 10 ? temp % 60 : '0' + temp % 60
                time.innerHTML = hours + ":" + mins + "小时后"
            }
            if (time.classList.contains('red')) time.classList.remove('red')
            // document.querySelector('.red').classList.remove('red')
            arr[li.dataset.id].time = time.innerHTML
            localStorage.setItem('tesk', JSON.stringify(arr))
            render()

        }

        selctTime.value = ''
        sele.classList.remove('active')
        let temp = document.querySelector('.hehe')
        if (temp) {
            temp.src = "./images/sprkai.png"
            temp.classList.remove('hehe')
        }
    })



    //点击复选框完成
    function checkbox() {
        const gou = document.querySelectorAll('input[name="gou"]')
        for (let i = 0; i < gou.length; i++) {
            gou[i].addEventListener('change', function () {
                const li = gou[i].parentNode.children[2].children[1]
                let dd = arr.splice(li.dataset.id, 1)[0]
                if (gou[i].checked) {
                    dd.istrue = true
                    arr.push(dd)
                } else {
                    dd.istrue = false
                    dd.time = ''
                    arr.unshift(dd)
                }
                localStorage.setItem('tesk', JSON.stringify(arr))
                render()
            })
        }
    }
    // checkbox()
    //定时器
    setInterval(function () {
        const times = document.querySelectorAll('.time')
        for (let i = 0; i < times.length; i++) {
            if (times[i].innerHTML == '暂未设置时间' || times[i].innerHTML == '明天' || times[i].innerHTML == '已超时' || times[i].innerHTML == '您已完成') continue

            let hours = parseInt(times[i].innerHTML.slice(0, 2))
            let min = parseInt(times[i].innerHTML.slice(3, 5))

            if (hours == '0' && min == '0') {
                times[i].innerHTML = '已超时'
                const id = times[i].parentNode.parentNode.children[2].children[1].dataset.id
                arr[id].time = times[i].innerHTML
                continue

            } else if (min == '0') {
                hours = +hours - 1
                min = 59
            } else {
                min = +min - 1
            }
            hours = +hours >= 10 ? hours : '0' + hours
            min = +min >= 10 ? min : '0' + min
            times[i].innerHTML = hours + ':' + min + '小时后'
            const id = times[i].parentNode.parentNode.children[2].children[1].dataset.id
            arr[id].time = times[i].innerHTML
        }
        localStorage.setItem('tesk', JSON.stringify(arr))
        render()
    }, 60000)

}


