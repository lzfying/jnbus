﻿/**
*
*
* @author yy
* @since 2014-5-20
*/

Ext.Ajax.request({
	url : 'busbanci.do?reqCode=getbanci_table_daterange',
	success : function(response) { // 回调函数有1个参数
		var resultArray = Ext.util.JSON
		.decode(response.responseText);
		var resultmsg = resultArray.msg;
		var msgs = resultmsg.split('~');
		var mindate = msgs[0];
		var maxdate =msgs[1];
		//alert(msgs+"+"+mindate+"+"+maxdate);


		Ext.onReady(function() {
			Ext.Ajax.timeout = 1180000;

			var updownstore = new Ext.data.SimpleStore({
				fields : ['name', 'code'],
				data : [['早高峰', '1'], ['晚高峰', '2'],['高峰','']]
			});

			var updownCombo= new Ext.form.ComboBox({
				id : 'updown',
				hiddenName : 'zwpeak',
				fieldLabel : '早/晚高峰',
				emptyText : '请选择',
				triggerAction : 'all',
				store : updownstore,
				displayField : 'name',
				valueField : 'code',
				mode : 'local',
				forceSelection : false, // 选中内容必须为下拉列表的子项
				editable : false,
				typeAhead : true,
				allowBlank : false,
				// value:'0002',
				resizable : true,
				anchor : '95%'
			});

			var companyStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'busbanci.do?reqCode=queryCompanyDatasByClass'
				}),
				reader : new Ext.data.JsonReader({}, [{
					name : 'value'
				}, {
					name : 'text'
				}]),
				baseParams : {
					deptlength : '6'
				}
			});
			// areaStore.load(); //如果mode : 'local',时候才需要手动load();

			var companyCombo = new Ext.form.ComboBox({
				hiddenName : 'companyName',
				fieldLabel : '分公司',
				emptyText : '请选择分公司...',
				triggerAction : 'all',
				store : companyStore,
				displayField : 'text',
				valueField : 'value',
				loadingText : '正在加载数据...',
				mode : 'remote', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
				forceSelection : true,
				typeAhead : true,
				resizable : true,
				editable : false,
				allowBlank : false,
				anchor : '100%'
			});


			var qForm = new Ext.form.FormPanel({
				region : 'north',
				margins : '3 3 3 3',
				title : '<span class="commoncss">查询条件<span>',
				collapsible : true,
				border : true,
				labelWidth : 90, // 标签宽度
				// frame : true, //是否渲染表单面板背景色
				labelAlign : 'right', // 标签对齐方式
				bodyStyle : 'padding:3 5 0', // 表单元素和表单面板的边距
				buttonAlign : 'center',
				height : 125,
				items : [{
					layout : 'column',
					border : false,
					items : [{
						columnWidth : .33,
						layout : 'form',
						labelWidth : 60, // 标签宽度
						defaultType : 'textfield',
						border : false,
						items : [companyCombo]
					},{
						columnWidth : .33,
						layout : 'form',
						labelWidth : 60, // 标签宽度
						defaultType : 'textfield',
						border : false,
						items : [{
							xtype : 'datefield',
							fieldLabel : '起始日期', // 标签
							id:'date1',
							name : 'date1', // name:后台根据此name属性取值
							format:'Y-m-d', //日期格式化
							maxValue:maxdate, //允许选择的最大日期
							allowBlank : false,
							minValue:mindate, //允许选择的最小日期
							anchor : '100%' // 宽度百分比
						}]
					},{
						columnWidth : .33,
						layout : 'form',
						labelWidth : 60, // 标签宽度
						defaultType : 'textfield',
						border : false,
						items : [{
							xtype : 'datefield',
							fieldLabel : '结束日期', // 标签
							id:'date2',
							name : 'date2', // name:后台根据此name属性取值
							format:'Y-m-d', //日期格式化
							maxValue:maxdate, //允许选择的最大日期
							//allowBlank : false,
							minValue:mindate, //允许选择的最小日期
							anchor : '100%' // 宽度百分比
						}]
					}]
				}],
				buttons : [{
					text : '查询',
					iconCls : 'previewIcon',
					handler : function() {
						if (!qForm.form.isValid()) {
							return;
						}
						queryBalanceInfo(qForm.getForm());
					}
				}, {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						qForm.getForm().reset();
					}
				}]
			});





			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
				header : 'NO',
				width : 28
			});

			// 定义列模型
			var cm = new Ext.grid.ColumnModel([rownum, sm,  {
				header : '',
				dataIndex : 'team_id',
				hidden : true, // 隐藏列
				sortable : true,
				width : 0
				// 列宽
			}	,   {
				header : '路队',
				dataIndex : 'team_name',
				//hidden : true, // 隐藏列
				sortable : true,
				width : 50
				// 列宽
			}	,{
				header : '日期',
				dataIndex : 'date',
				sortable : true,
				width : 150
			}, {
				header : '平峰间隔数量',
				dataIndex : 'pfjgs',
				width : 100
			}, {
				header : '超出平峰最大间隔数量',
				dataIndex : 'ccpfjgzds',
				width : 150
			}, {
				header : '超出数量占所有间隔数量比例(%)',
				dataIndex : 'cczb',
				width : 190
			},{
				header : '超出最大间隔10%内数量',
				dataIndex : 'cc10',
				width : 150
			}, {
				header : '超出最大间隔10%-20%数量',
				dataIndex : 'cc10_20',
				width : 160
			}, {
				header : '超出最大间隔20%以上数量',
				dataIndex : 'cc20',
				width : 160
			}
			]);

			/**
			* 数据存储
			*/
			var store = new Ext.data.Store({
				// 获取数据的方式
				proxy : new Ext.data.HttpProxy({
					url :'busbanci.do?reqCode=queryTeamFlatPeakInterval'
				}),
				// 数据读取器
				reader : new Ext.data.JsonReader({},[{
					name : 'team_id'
				}, {
					name : 'team_name'
				}, {
					name : 'date'
				}, {
					name : 'pfjgs'
				}, {
					name : 'ccpfjgzds'
				}, {
					name : 'cczb'
				}, {
					name : 'cc10'
				}, {
					name : 'cc10_20'
				}, {
					name : 'cc20'
				}
				])
			});

			// 定义列模型
			var cm1 = new Ext.grid.ColumnModel([rownum, sm, {
				header : '线路',
				dataIndex : 'route_name',
				//hidden : true, // 隐藏列
				sortable : true,
				width : 50
				// 列宽
			}	, {
				header : '平峰间隔数量',
				dataIndex : 'pfjgs',
				width : 100
			}, {
				header : '超出平峰最大间隔数量',
				dataIndex : 'ccpfjgzds',
				width : 150
			}, {
				header : '超出数量占所有间隔数量比例(%)',
				dataIndex : 'cczb',
				width : 190
			},{
				header : '超出最大间隔10%内数量',
				dataIndex : 'cc10',
				width : 150
			}, {
				header : '超出最大间隔10%-20%数量',
				dataIndex : 'cc10_20',
				width : 160
			}, {
				header : '超出最大间隔20%以上数量',
				dataIndex : 'cc20',
				width : 160
			}
			]);

			/**
			* 数据存储
			*/
			var store1 = new Ext.data.Store({
				// 获取数据的方式
				proxy : new Ext.data.HttpProxy({
					url :'busbanci.do?reqCode=queryFlatTeamInfo'
				}),
				// 数据读取器
				reader : new Ext.data.JsonReader({},[{
					name : 'route_name'
				}, {
					name : 'date'
				}, {
					name : 'pfjgs'
				}, {
					name : 'ccpfjgzds'
				}, {
					name : 'cczb'
				}, {
					name : 'cc10'
				}, {
					name : 'cc10_20'
				}, {
					name : 'cc20'
				}
				])
			});

			// 表格实例
			var grid1 = new Ext.grid.GridPanel({
				// 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体

				margins : '3 3 3 3',
				height : 500,
				frame : true,
				autoScroll : true,
				region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
				store : store1, // 数据存储
				stripeRows : true, // 斑马线
				cm : cm1, // 列模型
				sm : sm, // 复选框
				//			tbar : tbar, // 表格工具栏
				//			bbar : bbar,// 分页工具栏
				viewConfig : {
					// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					// forceFit : true
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
			});

			var updateWindow1 = new Ext.Window({
				title : '<span class="commoncss">线路信息<span>', // 窗口标题
				layout : 'fit', // 设置窗口布局模式
				width : 900, // 窗口宽度
				height : 260, // 窗口高度
				closable : false, // 是否可关闭
				collapsible : true, // 是否可收缩
				maximizable : true, // 设置是否可以最大化
				border : false, // 边框线设置
				constrain : true, // 设置窗口是否可以溢出父容器
				animateTarget : Ext.getBody(),
				pageY : 20, // 页面定位Y坐标
				pageX : document.body.clientWidth / 2 - 600 / 2, // 页面定位X坐标
				items : [grid1], // 嵌入的表单面板
				buttons : [ {
					text : '关闭',
					iconCls : 'deleteIcon',
					handler : function() {
						updateWindow1.hide();
					}
				}]
			});

			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
				this.baseParams = qForm.getForm().getValues();
			});
			// 每页显示条数下拉选择框
			var pagesize_combo = new Ext.form.ComboBox({
				name : 'pagesize',
				triggerAction : 'all',
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : ['value', 'text'],
					data : [[10, '10条/页'], [20, '20条/页'],
					[50, '50条/页'], [100, '100条/页'],
					[250, '250条/页'], [500, '500条/页']]
				}),
				valueField : 'value',
				displayField : 'text',
				value : '20',
				editable : false,
				width : 85
			});


			// 表格右键菜单
			var contextmenu = new Ext.menu.Menu({
				id : 'theContextMenu',
				items : [{
					text : '查看详情',
					iconCls : 'previewIcon',
					handler : function() {
						// 获取当前选择行对象
						var record = grid.getSelectionModel()
						.getSelected();
						var xmmc = record.get('xmmc');
						Ext.MessageBox.alert('提示', xmmc);
					}
				}, {
					text : '导出列表',
					iconCls : 'page_excelIcon',
					handler : function() {
						// 获取当前选择行对象
						var record = grid.getSelectionModel()
						.getSelected();
						var xmmc = record.get('xmmc');
						Ext.MessageBox.alert('提示', xmmc);
					}
				}]
			});

			// 表格实例
			var grid = new Ext.grid.GridPanel({
				// 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体

				margins : '3 3 3 3',
				height : 500,
				frame : true,
				autoScroll : true,
				region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
				store : store, // 数据存储
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				sm : sm, // 复选框
				//			tbar : tbar, // 表格工具栏
				//			bbar : bbar,// 分页工具栏
				viewConfig : {
					// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
					// forceFit : true
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
			});


			// 页面初始自动查询数据
			// store.load({params : {start : 0,limit : bbar.pageSize}});

			// 小画笔点击事件
			grid.on("cellclick", function(pGrid, rowIndex, columnIndex, e) {
				var store = pGrid.getStore();
				var record = store.getAt(rowIndex);
				var fieldName = pGrid.getColumnModel()
				.getDataIndex(columnIndex);
				// columnIndex为小画笔所在列的索引,缩阴从0开始
				// 这里要非常注意!!!!!
				if (fieldName == 'edit' && columnIndex == 2) {
					var xmmc = record.get("xmmc");
					// 到此你就可以继续做其他任何事情了
					Ext.MessageBox.alert('提示', xmmc);
				}
			});

			// 监听单元格双击事件
			grid.on("celldblclick", function(pGrid, rowIndex, columnIndex, e) {
				var record = pGrid.getStore().getAt(rowIndex);
				var fieldName = pGrid.getColumnModel()
				.getDataIndex(columnIndex);
				var cellData = record.get(fieldName);

				// Ext.MessageBox.alert('提示', cellData);
			});

			// 监听行双击事件
			grid.on('rowdblclick', function(pGrid, rowIndex, event) {
				// 获取行数据集
				var record = pGrid.getStore().getAt(rowIndex);
				// 获取单元格数据集
				var team_id = record.get("team_id");
				//alert(data);
				var params = qForm.getForm().getValues();
				params.team=team_id;
				updateCatalogItem(params);
				//	Ext.MessageBox.alert('提示', "双击行的索引为:" + rowIndex);
			});

			// 给表格绑定右键菜单
			grid.on("rowcontextmenu", function(grid, rowIndex, e) {
				e.preventDefault(); // 拦截默认右键事件
				grid.getSelectionModel().selectRow(rowIndex); // 选中当前行
				contextmenu.showAt(e.getXY());
			});

			// 布局模型
			var viewport = new Ext.Viewport({
				layout : 'border',
				items : [qForm, grid]
			});

			// 查询表格数据
			function queryCatalogItem() {
				store.load({
					params : {
						selectroute : Ext.getCmp('selectroute').getValue()
					}
				});
			}

			// 查询表格数据
			function queryBalanceInfo(pForm) {
				var params = pForm.getValues();
				//params.start = 0;
				//params.limit = bbar.pageSize;
				store.load({
					params : params
				});
			}

			function updateCatalogItem(record){

				store1.load({
					params : record
				});
				updateWindow1.show();
			}

			// 获取选择行
			function getCheckboxValues() {
				// 返回一个行集合JS数组
				var rows = grid.getSelectionModel().getSelections();
				if (Ext.isEmpty(rows)) {
					Ext.MessageBox.alert('提示', '您没有选中任何数据!');
					return;
				}
				// 将JS数组中的行级主键，生成以,分隔的字符串
				var strChecked = jsArray2JsString(rows, 'xmid');
				Ext.MessageBox.alert('提示', strChecked);
				// 获得选中数据后则可以传入后台继续处理
			}

			// 演示render的用法
			function colorRender(value, cellMetaData, record) {
				// alert(record.data.xmid); 可以获取到Record对象哦
				if (value == '盒') {
				return "<span style='color:red; font-weight:bold'>" + value
				+ "</span>";
			}
			if (value == '瓶') {
			return "<span style='color:green; font-weight:bold'>"
			+ value + "</span>";
		}
		return value;
	}

	// 生成一个图标列
	function iconColumnRender(value) {
		return "<a href='javascript:void(0);'><img src='" + webContext
		+ "/resource/image/ext/edit1.png'/></a>";;
	}

});

},
failure : function(response) {
	Ext.MessageBox.alert('提示', '数据加载失败请检查网络或联系开发者！');
},
params : {
}
});
