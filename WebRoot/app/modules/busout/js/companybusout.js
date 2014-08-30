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
	Ext.Ajax.timeout = 180000;
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
								items : [{
							        xtype : 'datefield',
									fieldLabel : '起始日期', // 标签
									id:'date1',
									allowBlank : false,
									name : 'date1', // name:后台根据此name属性取值 
									format:'Y-m-d', //日期格式化
									maxValue:maxdate, //允许选择的最大日期
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
									//allowBlank : false,
									name : 'date2', // name:后台根据此name属性取值 
									format:'Y-m-d', //日期格式化
									maxValue:maxdate, //允许选择的最大日期
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
			var cm = new Ext.grid.ColumnModel([rownum, sm,   {
						header : '公司',
						dataIndex : 'comp_name',
						//hidden : true, // 隐藏列
						sortable : true,
						width : 50
						// 列宽
				}, {
						header : '日期',
						dataIndex : 'date',
						//hidden : true, // 隐藏列
						sortable : true,
						width : 150
						// 列宽
				},{
						header : '营运配车',
						dataIndex : 'zf_num_yypeiche',
						sortable : true,
						width : 110
					}, {
						header : '挂车',
						dataIndex : 'zf_num_guache',
						width : 110
						}, {
						header : '实际出车',
						dataIndex : 'qr_out',
						width : 110	
						}, {
						header : '早高峰出车',
						dataIndex : 'zf_out',
						width : 110	
						}, {
						header : '晚高峰出车',
						dataIndex : 'wf_out',
						width : 110	
						}, {
						header : '高峰出车',
						dataIndex : 'gf',
						width : 110	
						}, {
						header : '高峰出车完成率(%)',
						dataIndex : 'peichelv',
						width : 115	
						}
					]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
						// 获取数据的方式
						proxy : new Ext.data.HttpProxy({
									url :'busout.do?reqCode=queryCompanyBusOut'
								}),
						// 数据读取器
						reader : new Ext.data.JsonReader({},[{
											name : 'comp_name'
										},{
											name: 'date'
											}, {
											name : 'zf_num_yypeiche'
										}, {
											name : 'zf_num_guache'
										}, {
											name : 'qr_out'
										}, {
											name : 'zf_out'
										}, {
											name : 'wf_out'
										}, {
											name : 'gf'
										}, {
											name : 'peichelv'
										}
										])
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
						var data = record.get("xmmc");
						Ext.MessageBox.alert('提示', "双击行的索引为:" + rowIndex);
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